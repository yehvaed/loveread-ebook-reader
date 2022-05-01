import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from '@utils/navigator';
import { queryClient } from '@utils/query';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from 'react-query';


export const Screens = ({ children }: React.PropsWithChildren<{}>) => (
    <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
            <NavigationContainer >
                <Navigator >
                    {children}
                </Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    </QueryClientProvider>
)