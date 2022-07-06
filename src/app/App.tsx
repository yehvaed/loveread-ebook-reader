import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "@typings";
import React, { FC } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

import { BooksExplorerScreen } from "./screens/BooksExplorer.screen";
import { ReaderScreen } from "./screens/Reader/Reader.screen";

export const { Screen, Navigator } =
  createNativeStackNavigator<RootStackParamList>();

const Container: FC = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export function App() {
  return (
    <Container>
      <Navigator>
        <Screen
          name="book-explorer"
          component={BooksExplorerScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name="reader"
          component={ReaderScreen}
          options={{
            headerShown: false,
            headerBackVisible: false,
          }}
        />
      </Navigator>
    </Container>
  );
}
