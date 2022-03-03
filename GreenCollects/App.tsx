import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import {
    createNativeStackNavigator,
    NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

import * as eva from "@eva-design/eva";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

import Home from "./component/Home";
import Map from "./component/Map"



// Create a basic stack for all views
const Stack = createNativeStackNavigator();

// Create the options to apply to all Stack decoration
const options: NativeStackNavigationOptions = { headerTitleAlign: "center" };

export default function App() {
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
                <NavigationContainer>
                    <Stack.Navigator>
                        {/* <Stack.Screen
                            name="Accueil"
                            component={Home}
                            options={options} */}
                        {/* /> */}
                        <Stack.Screen
                            name="Map"
                            component={Map}
                            options={options}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </ApplicationProvider>
        </>
    );
}
