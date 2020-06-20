import React, { useEffect, useState}  from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import api from './services/api';

export default function App () {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            console.log(response.data);
            
            setProjects(response.data);            
        });
    }, []);

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='#7179c1'></StatusBar>
            <View style={styles.container}>
                <Text style={styles.title} >Hello GoStack</Text>
            </View>
        </>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#FFF',
        fontSize: 32,
        fontWeight: 'bold'
    }
})