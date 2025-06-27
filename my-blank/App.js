import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  // Arreglo para definir nombres que se van a utilizar al inicio
  const [nombres, setNombres] = useState([
    'Marian', 'Alexis', 'Mario', 'Yahir', 'Miguel'
  ]);

  // Función para actualizar la lista con un nuevo nombre
  const [nuevoNombre, setNuevoNombre] = useState('');

  // Funciones que sirven para determinar la posición que va a tener el ScrollView
  const [scrollHeight, setScrollHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0);


  // Función personalizada para que la barra se adapte al contenedor
  const handleScroll = (event) => {
    scrollY(event.nativeEvent.contentOffset.y)
  };

  const scrollbarHeight = scrollHeight * (scrollHeight / contentHeight);
  const scrollbarPosition = scrollY * (scrollHeight / contentHeight);

  // Función para agregar un nombre
  const agregarNombre = () => {
    const nombreTrim = nuevoNombre.trim();
    if (nombreTrim.length > 0){
      setNombres([...nombres, nombreTrim]);
      setNuevoNombre('');
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pase de lista</Text>
      <View style={styles.inputRow}>
        <TextInput
        style={styles.input}
        placeholder='Nuevo nombre'
        placeholderTextColor='#888'
        value={nuevoNombre}
        onChangeText={setNuevoNombre}
        onSubmitEditing={agregarNombre}
        />
        <TouchableOpacity style={styles.btnAgregar} onPress={agregarNombre}>
          <Text style={styles.btnAgregar}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollWrapper} onLayout={(event) => setScrollHeight(event.nativeEvent.layout.height)}>
        <ScrollView
        style={styles.scrollArea}
        onContentSizeChange={(w,h) => setContentHeight(h)}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        >
          {nombres.map((nombre,index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.texto}>{nombre}</Text>
            </View>
          ))}
        </ScrollView>
        {contentHeight > scrollHeight && (
          <View style={[styles.scrollBar, { height: scrollbarHeight, top: scrollbarPosition }]} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e32551',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#012677',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 45,
    marginRight: 10,
  },
  btnAgregar: {
    backgroundColor: '#012677',
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  scrollWrapper: {
    position: 'relative',
    height: 500,
  },
  scrollArea: {
    backgroundColor: '#f76f6d',
    borderRadius: 12,
    padding: 10,
    height: 500,
    borderWidth: 1,
    borderColor: '#f76f6d'
  },
  item: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  texto: {
    fontSize: 18,
    color: '#000000',
  },
  scrollBar: {
    position: 'absolute',
    width: 8,
    right: 2,
    backgroundColor: '#000',
    borderRadius: 3,
  }
});
