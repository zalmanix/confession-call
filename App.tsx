import React, { createContext, useEffect, useState } from "react";
import SystemNavigationBar from "react-native-system-navigation-bar";

import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeActivity from "./pages/HomeActivity";
import AdminActivity from "./pages/AdminActivity";
import SleepActivity from "./pages/SleepActivity";
import { CHECK_ASLEEP_INTERVAL } from "./constants/Constants";

export type MainNavigationProp = NativeStackNavigationProp<MainStackList>;

export type MainStackList = {
  Home: undefined;
  Admin: undefined;
  Sleep: undefined;
};

const Stack = createNativeStackNavigator<MainStackList>();

type ContextProps = {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  isAsleep: boolean;
};

export const MainContext = createContext<ContextProps | null>(null);

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [isAsleep, setIsAsleep] = useState(false);
  
  useEffect(() => {
    SystemNavigationBar.stickyImmersive();

    const checkSystemTime = () => {
      const currentDate = new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
  
      const currentTimeInMinutes = hours * 60 + minutes;
      const startTimeInMinutes = 6 * 60 + 15;
      const endTimeInMinutes = 21 * 60;
  
      if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes) {
        setIsAsleep(false);
        setTimeout(checkSystemTime, CHECK_ASLEEP_INTERVAL);
    
        return;
      }
  
      setIsAsleep(true);
      setTimeout(checkSystemTime, CHECK_ASLEEP_INTERVAL);
    }

    const timeoutId = setTimeout(checkSystemTime, CHECK_ASLEEP_INTERVAL);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NavigationContainer>
      <MainContext.Provider value={{ refresh, setRefresh, isAsleep }}>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeActivity} options={{ headerShown: false }} />
          <Stack.Screen name="Admin" component={AdminActivity} options={{ headerShown: false }} />
          <Stack.Screen name="Sleep" component={SleepActivity} options={{ headerShown: false }} />
        </Stack.Navigator>
      </MainContext.Provider>
    </NavigationContainer>
  );
};

export default App;
