import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddCollectMap from "../shared/AddCollectMap";
import CollectCreation from "../collect-screens/CollectCreation";

const Stack = createNativeStackNavigator();

const CollectNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={"Organisation"}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Organisation" component={CollectCreation} />
            <Stack.Screen
                name="Sélectionner un point"
                component={AddCollectMap}
            />
        </Stack.Navigator>
    );
};

export default CollectNavigator;
