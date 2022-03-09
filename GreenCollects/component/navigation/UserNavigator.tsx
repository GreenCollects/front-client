import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountDetails from "../user-screens/AccountDetails";
import Login from "../shared/Login";
import Register from "../shared/Register";
import Profile from "../user-screens/Profile";
import MyCollection from "../user-screens/MyCollection";


const Stack = createNativeStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={"Détails de mon compte"}>
        <Stack.Screen name="Détails de mon compte" component={AccountDetails} />
        <Stack.Screen name="Connexion" component={Login} />
        <Stack.Screen name="Inscription" component={Register} />
        <Stack.Screen name="Mon Profil" component={Profile} />
        <Stack.Screen name="Mes Collectes" component={MyCollection} />
    </Stack.Navigator>
  );
};

export default UserNavigator;