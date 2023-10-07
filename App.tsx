import React, { createContext, useState } from "react";
import SystemNavigationBar from "react-native-system-navigation-bar";

import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeActivity from "./pages/HomeActivity";
import AdminActivity from "./pages/AdminActivity";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call

export type MainNavigationProp = NativeStackNavigationProp<MainStackList>;

export type MainStackList = {
  Home: undefined;
  Admin: undefined;
};

const Stack = createNativeStackNavigator<MainStackList>();

type ContextProps = {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MainContext = createContext<ContextProps | null>(null);

const App = () => {
  void SystemNavigationBar.stickyImmersive();
  const [refresh, setRefresh] = useState(false);

  return (
    <NavigationContainer>
      <MainContext.Provider value={{ refresh, setRefresh }}>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeActivity} options={{ headerShown: false }} />
          <Stack.Screen name="Admin" component={AdminActivity} options={{ headerShown: false }} />
        </Stack.Navigator>
      </MainContext.Provider>
    </NavigationContainer>
  );
};

export default App;
