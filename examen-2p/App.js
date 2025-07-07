import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, FlatList,
  ActivityIndicator, Alert, StyleSheet, TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Obtener sugerencias al escribir
  useEffect(() => {
    if (!city.trim()) {
      setSuggestions([]);
      return;
    }

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(async () => {
      try {
        const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: city,
            format: 'json',
            addressdetails: 1,
            limit: 5
          },
          headers: {
            'User-Agent': 'WeatherApp/1.0 (122042331@upq.edu.mx)'
          }
        });

        setSuggestions(res.data);
      } catch (err) {
        setSuggestions([]);
      }
    }, 500); // debounce

    setTypingTimeout(timeout);
  }, [city]);

  const getWeather = async (lat, lon, display_name) => {
    setLoading(true);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
      const response = await axios.get(url);

      const weather = response.data.current_weather;

      setWeatherData(prev => [
        ...prev,
        {
          id: Date.now(),
          city: display_name,
          temperature: weather.temperature,
          wind: weather.windspeed,
          code: weather.weathercode
        }
      ]);
    } catch (err) {
      Alert.alert('Error', 'No se pudo obtener el clima');
    } finally {
      setLoading(false);
      setCity('');
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (item) => {
    getWeather(item.lat, item.lon, item.display_name);
  };

  const removeCity = (id) => {
    setWeatherData(prev => prev.filter(c => c.id !== id));
  };

  const weatherDescriptions = {
    0: 'Despejado',
    1: 'Principalmente despejado',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Niebla',
    51: 'Llovizna ligera',
    61: 'Lluvia ligera',
    71: 'Nieve ligera',
    80: 'Chubascos',
    95: 'Tormenta'
  };

  const getGradientColors = (code) => {
    if ([0, 1].includes(code)) return ['#56ccf2', '#2f80ed'];
    if ([2, 3].includes(code)) return ['#bdc3c7', '#2c3e50'];
    if ([45].includes(code)) return ['#757f9a', '#d7dde8'];
    if ([51, 61, 80].includes(code)) return ['#4b79a1', '#283e51'];
    if ([71].includes(code)) return ['#83a4d4', '#b6fbff'];
    if ([95].includes(code)) return ['#373B44', '#4286f4'];
    return ['#ece9e6', '#ffffff'];
  };

  const getWeatherIcon = (code) => {
    if (code === 0) return 'weather-sunny';
    if (code === 1 || code === 2) return 'weather-partly-cloudy';
    if (code === 3) return 'weather-cloudy';
    if (code === 45) return 'weather-fog';
    if ([51, 61, 80].includes(code)) return 'weather-rainy';
    if (code === 71) return 'weather-snowy';
    if (code === 95) return 'weather-lightning';
    return 'weather-cloudy-alert';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clima</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe el nombre de una ciudad"
        value={city}
        onChangeText={setCity}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestion}
              onPress={() => handleSelectSuggestion(item)}
            >
              <MaterialCommunityIcons name="map-marker" size={20} color="#555" />
              <Text style={styles.suggestionText}>{item.display_name}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
        />
      )}
      {loading && <ActivityIndicator size="large" color="#007aff" style={{ marginTop: 10 }} />}
      <ScrollView style={{ marginTop: 20, flex: 1 }}>
        {weatherData.map((item) => (
          <LinearGradient
            key={item.id}
            colors={getGradientColors(item.code)}
            style={styles.card}
          >
            <MaterialCommunityIcons
              name={getWeatherIcon(item.code)}
              size={48}
              color="white"
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.city}>{item.city}</Text>
            <Text style={styles.temp}>{item.temperature}°C</Text>
            <Text style={styles.desc}>
              {weatherDescriptions[item.code] || `Código: ${item.code}`}
            </Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeCity(item.id)}
            >
              <MaterialCommunityIcons name="trash-can-outline" size={20} color="white" />
              <Text style={styles.removeButtonText}> Eliminar</Text>
            </TouchableOpacity>
          </LinearGradient>
        ))}
      </ScrollView>
      <Text style={styles.footer}>
        Datos proporcionados por Open-Meteo y OpenStreetMap (Nominatim)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 50, flex: 1, backgroundColor: '#f0f0f0' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    borderRadius: 5, marginBottom: 5, backgroundColor: '#fff'
  },
  suggestionList: {
    backgroundColor: '#fff',
    maxHeight: 150,
    borderRadius: 5,
    marginBottom: 10
  },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  suggestionText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    flexShrink: 1
  },
  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  city: { fontSize: 20, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  temp: { fontSize: 24, marginVertical: 5, color: '#fff' },
  desc: { fontSize: 16, marginBottom: 10, color: '#fff', textAlign: 'center' },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff4d4d',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
    padding: 10,
  },
});
