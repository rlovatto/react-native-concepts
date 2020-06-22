import React, { useEffect, useState}  from 'react';
import { SafeAreaView, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import api from './services/api';

export default function App () {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {         
            setProjects(response.data);            
        });
    }, []);

    async function handleAddProject(){
        const response = await api.post('projects',{
            title: `Novo projeto ${Date.now()}`,
            owner: 'Robinson Lovatto'
        });

        const project = response.data;

        setProjects([...projects,project]);
    }

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor='#7179c1'></StatusBar>
            
            <SafeAreaView style={styles.container}>
                <FlatList 
                    data={projects} //deve ser um array
                    keyExtractor={project => project.id}
                    renderItem={({item:project}) => ( //desestruturação do argumento item dentro da variável que é renomeada para project
                        <Text style={styles.project}> {project.title} </Text>
                    )}
                
                /> 

                <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleAddProject}>
                    <Text style={styles.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView> 

            {/* <View style={styles.container}>
                {projects.map(project => (
                    <Text style={styles.project} key={project.id} > {project.title} </Text>
                ))}
            </View> */}
        </>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    project: {
        color: '#FFF',
        fontSize: 30
    },
    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
})