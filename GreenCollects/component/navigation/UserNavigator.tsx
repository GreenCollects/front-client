import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profil from "../Profil";
import Login from "../shared/Login";
import Register from "../shared/Register";


const Stack = createNativeStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={"Mon Profil"}>
        <Stack.Screen name="Mon Profil" component={Profil} />
        <Stack.Screen name="Connexion" component={Login} />
        <Stack.Screen name="Inscription" component={Register} />
    </Stack.Navigator>
  );
};

export default UserNavigator;