/* Zona 1: importaciones */
import { StatusBar } from 'expo-status-bar';
import { use, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image } from 'react-native';

/* Zona 2: Main */
export default function App() {
  const [botonDesactivado,setBotonDesactivado]=useState(false);
  const [contador,setContador]=useState(0);
  return (
    <View>
      <Button title="Presioname" color='#841584' onPress={()=>alert('Me has presionado')}></Button>
      <Button
      title={botonDesactivado ? 'Desactivado':'Desactivame'}
      disabled={botonDesactivado}
      onPress={()=>setBotonDesactivado(true)}
      >
      </Button>
      <View style={styles.contenedor}>
        <Button title="Izquierda" color='#674323'></Button>
        <Button title="Derecha" color='#097865'></Button>
      </View>
      <TouchableOpacity style={styles.dynamicButton} onPress={()=>setContador(contador+1)}>
        <Text style={styles.dynamicText}>{contador}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>alert('La pokebola ha sido presionada')}>
        <Image source={require('./assets/pokebola.png')} style={styles.imagen}></Image>
      </TouchableOpacity>
    </View>
  );
}

/* Zona 3: Estilos */
const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  boton: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#234354'
  },
  textoBoton: {
    color: '#124354',
    fontSize: 18,
  },
  imagen: {
    width: 100,
    height: 100,
  },
  dynamicButton: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#987867',
    borderRadius: 5,
    alignItems: 'center',
  }
});