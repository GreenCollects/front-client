import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountDetails from "../user-screens/AccountDetails";
import Login from "../shared/Login";
import Register from "../shared/Register";


const Stack = createNativeStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={"Détails de mon compte"}>
        <Stack.Screen name="Détails de mon compte" component={AccountDetails} />
        <Stack.Screen name="Connexion" component={Login} />
        <Stack.Screen name="Inscription" component={Register} />
    </Stack.Navigator>
  );
};

export default UserNavigator;