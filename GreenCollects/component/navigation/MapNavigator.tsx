import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Map from "../map-screens/Map";
import AddCollectMap from "../shared/AddCollectMap";
import { AddPoint } from "../map-screens/AddPoint";

const Stack = createNativeStackNavigator();

const MapNavigator = () => {
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

export default MapNavigator;
