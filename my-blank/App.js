import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [nombre,setNombre]=useState('');

  const mostrarAlerta=()=>{
    if (nombre.trim()===''){
      Alert.alert('error', 'Por favor escribe algo');
      alert('Escribe algo');
    }else{
      Alert.alert('Bienvenido', `Hola ${nombre}, bienbenido a nuestra app`);
      alert(`Hola ${nombre}, bienbenido a nuestra app`);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ingresa tu nombre</Text>
      <TextInput style={styles.input}
      placeholder='Escribe tu nombre'
      onChangeText={setNombre}
      value={nombre}>
      </TextInput>
      <Button title='Enviar' onPress={mostrarAlerta}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding:10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    color: '#000',
  }
});
