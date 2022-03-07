import React from "react";

import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import AppNavigator from "./component/navigation/AppNavigator";
import configureStore from "./component/store/Store";
import { Provider } from 'react-redux';
import { PersistGate } from  'redux-persist/es/integration/react'

const {store, persistor} = configureStore();

export default function App() {
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ApplicationProvider {...eva} theme={eva.light}>
                        <AppNavigator />
                    </ApplicationProvider>
                </PersistGate>
            </Provider>
        </>
    );
}
