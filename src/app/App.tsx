import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Home } from './screens/Home';

const { Navigator, Screen } = createNativeStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Navigator >
                    <Screen name="Home" component={Home} options={{ headerShown: false }} />
                </Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
