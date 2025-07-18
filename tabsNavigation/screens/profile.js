import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Details from './details';

const Stack = createNativeStackNavigator();

function Profile({ navigation }){
    return(
        <View style={styles.container}>
            <View style={styles.iconRow}>
                <Ionicons name='person-outline' size={28} color='green'/>
                <Text style={styles.title}>Perfil de usuario</Text>
                <Pressable style={[styles.button,styles.buttonDetails]} onPress={() => navigation.navigate('Details')}>
                    <Text style={styles.buttonText}>Detalles de usuario</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default function ProfileStack(){
    return(
        <Stack.Navigator initialRouteName='Profile'>
            <Stack.Screen name='Profile' component={Profile}/>
            <Stack.Screen name='Details' component={Details}/>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20,
    },
    iconRow: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'green',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center'
    },
    buttonDetails: {
        backgroundColor: '#007bff'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
});