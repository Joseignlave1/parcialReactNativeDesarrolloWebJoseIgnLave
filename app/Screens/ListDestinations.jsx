import { useCallback, useEffect, useState } from "react";
import { getDestinations, deleteDestinations} from "../Services/api";
import { ScrollView, View, Text, TouchableOpacity, FlatList, Image,StyleSheet, Alert} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

/* 
{
    "id": "aruf",
    "name": "Mount Everest",
    "description": "Climb the highest mountain in the world.",
    "difficulty": "hard",
    "isFavorite": false
  },
*/

const ListDestinations = ({navigation}) => {
    
    const [destinations, setDestinations] = useState([]);


    useFocusEffect(useCallback(() => {
         getDestinations().then((destination) => setDestinations(destination))
    },[]))

    const handleDelete = async (id) => {
        try {
            await deleteDestinations(id); // Llama al servicio para borrar el planeta
            // Filtra el estado para eliminar el planeta localmente
            setDestinations((prevState) => prevState.filter((destination) => destination.id !== id));
        } catch (error) {
            console.error("Error deleting planet:", error);
            Alert.alert("Error", "No se pudo borrar el destino");
        }
    };

     const goToEditDestination = (id) => {
        navigation.navigate('EditDestination', {id});
    }

     return (
        <View style={styles.container} >
            <Text style={styles.text}>Destinos Turisticos</Text>
            <FlatList 
            data={destinations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <View style={styles.destinationItem}> 
                <View style={styles.destinationInfo}>
                    <Text style={styles.destinationName}>{item.name}</Text>
                    <Text style={styles.destinationDescription}>{item.description}</Text>
                    <Text style={item.difficulty === "hard" ? styles.destinationDifficultyHard : item.difficulty === "medium" ? styles.destinationDifficultyModerate : styles.destinationDifficultyEasy} >{item.difficulty}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => goToEditDestination(item.id)} style={styles.editButton}>
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                    <Text style={styles.buttonText}>Borrar</Text>
                  </TouchableOpacity>
                </View>
                </View >

            )}
            />
        </View>
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    maxWidth: "85%",
    justifyContent: "center"
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText : {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  destinationItem: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignSelf: 'center',
   
  },
  destinationInfo: {
    flex: 1,
    justifyContent: 'center',
  },
 destinationName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
destinationDescription: {
    fontSize: 14,
    color: '#666',
  },
  destinationDifficultyEasy: {
    fontSize: 14,
    color: 'green',
  },
   destinationDifficultyModerate: {
    fontSize: 14,
    color: 'yellow',
  },
   destinationDifficultyHard: {
    fontSize: 14,
    color: 'violet',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  editButton: {
    backgroundColor: '#FFC107', // Color amarillo para editar
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: '#FF5733',
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
} );
export default ListDestinations;