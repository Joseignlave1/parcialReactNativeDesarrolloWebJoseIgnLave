import { createStackNavigator } from "@react-navigation/stack";
import EditDestination from "../Screens/EditDestination";
import ListDestinations from "../Screens/ListDestinations"
const Stack = createStackNavigator();

const App = () => {
    return (
    <Stack.Navigator initialRouteName="ListDestinations">
      <Stack.Screen name="ListDestinations" component={ListDestinations} />
      <Stack.Screen name="EditDestination" component={EditDestination} />
    </Stack.Navigator>
    )
}

export default App;