/* Zona 1: importaciones */
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import React,{useState} from 'react';

const Texto=(props)=>{
  const {style}=props
  const [contenido,setContenido]=useState("Hola Mundo React")
  const actualizarTexto=()=>{setContenido('Estado actualizado')}
  return(
    <Text style={[styles.text, style]} onPress={actualizarTexto}>{contenido}</Text>
  )
}

/* Zona 2: Main */
export default function App() {
  return (
    <View style={styles.container}>
      <Texto style={styles.red}></Texto>
      <Texto style={styles.green}></Texto>
      <Texto style={styles.blue}></Texto>
      <Button title='Presioname'></Button>
      <StatusBar style="auto" />
    </View>
  );
}

/* Zona 3: Estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'base-line',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  text: {
    color: 'green',
    fontSize: 20,
  },
  red: {backgroundColor: 'red'},
  green: {backgroundColor: 'green'},
  blue: {backgroundColor: 'blue'},
});