import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TextInput, Button, Switch, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';

function registerUser(fullName, email, agreeTermsAndConditions){
  if(fullName && email){
    if(agreeTermsAndConditions){
      Alert.alert("Usuario registrado exitosamente")
    }else{
      Alert.alert("Acepta los terminos y condiciones para poder registrarte")
    }
  }else{
    Alert.alert("Campleta el formulario por favor")
  }
}

export default function App() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [agreeTermsAndConditions, setAgreeTermsAndConditions] = useState(false)
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);
    return() => clearTimeout(timer);
  }, [])
  return (
    <SafeAreaView style={styles.screen}>
      {showSplash ? (
        <Text>¡Bienvenido!</Text>
      ):(
        <ImageBackground source={require('./assets/background.jpg')} style={styles.background}>
          <View style={styles.container}>
            <View style={styles.box}>
              <Text style={styles.title}>Registro de usuario</Text>
              <TextInput placeholder='Nombre completo' onChangeText={setFullName} value={fullName} style={styles.input}></TextInput>
              <TextInput placeholder='Correo electronico' onChangeText={setEmail} value={email} style={styles.input}></TextInput>
              <View style={styles.termsAndConditions}>
                <Text>Aceptar terminos y condiciones</Text>
                <Switch value={agreeTermsAndConditions} onValueChange={setAgreeTermsAndConditions} style={styles.switch}></Switch>
              </View>
              <Button title='Registrarse' onPress={() => registerUser(fullName, email, agreeTermsAndConditions)}></Button>
            </View>
          </View>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    backgroundColor: '#fff',

  },
  background: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding:10,
    marginBottom: 20
  },
  termsAndConditions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center',
  },
});
