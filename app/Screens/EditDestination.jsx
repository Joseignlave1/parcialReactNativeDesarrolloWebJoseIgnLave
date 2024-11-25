import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getDestinationId, updateDestination } from '../Services/api';
import DropDown from "../Screens/Dropdown"
/* 
{
    "id": "aruf",
    "name": "Mount Everest",
    "description": "Climb the highest mountain in the world.",
    "difficulty": "hard",
    "isFavorite": false
  },
*/
const EditDestination = ({route, navigation}) => {

    const {id} = route.params;
    const[destination, setDestination] = useState(null);
    const[name, setName] = useState('');
    const[description, setDescription] = useState('');
    const[difficulty, setDifficulty] = useState('');

    useEffect(() => {
        getDestinationId(id).then((singleDestination) => setDestination(singleDestination));
    },[id])

     useEffect(() => {
    if (destination) {
        setName(destination.name || '');
        setDescription(destination.description || '');
        setDifficulty(destination.difficulty || '');
    }
}, [destination]);

const destinationsTipes = [
    {
     difficulty: "easy"
    },
    {
     difficulty: "medium"
    },
    {
      difficulty: "hard"
    },
  ];

  const handleSelectDestination = (destination) => {
    // Completa los campos del formulario con los datos del planeta seleccionado
    setDifficulty(destination.difficulty)

  };
    const handleSaveChanges = async () => {
            const updatedDestination = {
                name,
                description,
                difficulty
            };

            updateDestination(id, updatedDestination);

            setName(updatedDestination.name);
            setDescription(updatedDestination.description);
            setDifficulty(updatedDestination.difficulty);
            
            navigation.navigate('ListDestinations');
        }

    return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Destino</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
       
      <DropDown data={destinationsTipes} onSelect={handleSelectDestination} />
      <Button title="Actualizar Destino" onPress={handleSaveChanges} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    fontSize: 16,
  },
});

export default EditDestination;