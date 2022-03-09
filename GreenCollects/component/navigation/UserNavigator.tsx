import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountDetails from "../user-screens/AccountDetails";
import Login from "../shared/Login";
import Register from "../shared/Register";
import Profile from "../user-screens/Profile";
import MyCollection from "../user-screens/MyCollection";
import Username from "../user-screens/Username";
import Email from "../user-screens/Email";
import FirstName from "../user-screens/FirstName";
import LastName from "../user-screens/LastName";


const Stack = createNativeStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={"Détails de mon compte"}>
        <Stack.Screen name="Détails de mon compte" component={AccountDetails} />
        <Stack.Screen name="Connexion" component={Login} />
        <Stack.Screen name="Inscription" component={Register} />
        <Stack.Screen name="Mon Profil" component={Profile} />
        <Stack.Screen name="Mes Collectes" component={MyCollection} />
        <Stack.Screen name="Votre nom d'utilisateur" component={Username} />
        <Stack.Screen name="Votre email" component={Email} />
        <Stack.Screen name="Votre prénom" component={FirstName} />
        <Stack.Screen name="Votre nom" component={LastName} />

    </Stack.Navigator>
  );
};

export default UserNavigator;