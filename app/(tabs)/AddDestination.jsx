import { View, Text, TextInput, Button, StyleSheet, Alert ,Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';
import DropDown from "../Screens/Dropdown"
import { addDestination } from '../Services/api';

/* 
{
    "id": "aruf",
    "name": "Mount Everest",
    "description": "Climb the highest mountain in the world.",
    "difficulty": "hard",
    "isFavorite": false
  },
*/
export default function AddDestination({navigation}) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficuly] = useState('');

  // Datos preexistentes para el Dropdown
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

  const handleAddDestination = async () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const newDestination = {
      name,
      description,
      difficulty
    };

    try {
      await addDestination(newDestination);
      Alert.alert('Éxito', 'El Destino fue agregado correctamente');
      navigation.navigate('')
    } catch (error) {
      
    }
  };

  const handleSelectDestination = (destination) => {
    // Completa los campos del formulario con los datos del planeta seleccionado
    setDifficuly(destination.difficulty)

  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
 <View style={stylesDestination.container}>
      <Text style={stylesDestination.title}>Agregar nuevo Destino</Text>

      <TextInput
        style={stylesDestination.input}
        placeholder="Nombre del destino"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={stylesDestination.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      
      <DropDown data={destinationsTipes} onSelect={handleSelectDestination} />
      <Button title="Agregar Destino" onPress={handleAddDestination} />
    </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

const stylesDestination = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
});
