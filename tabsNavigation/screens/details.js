import { View, Text, StyleSheet } from 'react-native';

export default function Details(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Detalles de usuario</Text>
            <Text>Usando Navegación Stack</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    }
});