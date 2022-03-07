import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Map from "../Map-Screens/Map";
import AddCollectMap from "../shared/AddCollectMap";
import { AddPoint } from "../Map-Screens/AddPoint";

const Stack = createNativeStackNavigator();

const MapScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Map">
      <Stack.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AddCollect" component={AddCollectMap} />
      <Stack.Screen name="AddPoint" component={AddPoint} />
    </Stack.Navigator>
  );
};

export default MapScreen;
