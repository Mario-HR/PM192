import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';

const FondoBienvenida = () => {
  return(
    <ImageBackground source={require('./assets/fondo.jpg')} style={styles.fondo}>
      <View style={styles.contenido}>
        <Text style={styles.titulo}>¡Bienvenido a la App!</Text>
      </View>
    </ImageBackground>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);
    return() => clearTimeout(timer);
  }, []);
  return (
    <SafeAreaView styleL={styles.container}>
      {showSplash ? (
        <FondoBienvenida/>
      ):(
        <View style={styles.mainContent}>
          <Text style={styles.mainText}>Pantalla principal</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fondo: {
    flex: 1,
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  titulo: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});

