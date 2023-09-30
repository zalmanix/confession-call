import React from "react";
import SystemNavigationBar from "react-native-system-navigation-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeActivity from "./pages/HomeActivity";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const Stack = createNativeStackNavigator();

const App = () => {
  void SystemNavigationBar.stickyImmersive();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeActivity" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeActivity} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
