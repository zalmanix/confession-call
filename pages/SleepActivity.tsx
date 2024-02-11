import { SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback} from "react-native";

import { MainNavigationProp } from "@app/App";
import { useMain } from "../hooks/context/useMain";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";

import { CHECK_ASLEEP_INTERVAL } from "../constants/Constants";


export type ItemData = {
  name: string;
  active: boolean;
  id: number;
};

export default function SleepActivity(): JSX.Element {
  const navigation = useNavigation<MainNavigationProp>();
  const { isAsleep } = useMain();
  
  const wakeUp = () => navigation.navigate("Home");

  const checkSystemTime = useCallback(() => {
    if (!isAsleep) wakeUp();

    setTimeout(checkSystemTime, CHECK_ASLEEP_INTERVAL);
  }, [isAsleep, navigation]);

  useEffect(() => {
    const interval = setTimeout(checkSystemTime, CHECK_ASLEEP_INTERVAL);

    return () => clearTimeout(interval);
  }, [checkSystemTime]);

  return (
    <SafeAreaView style={styles.background}>
      <TouchableWithoutFeedback onPress={() => wakeUp()} style={styles.touchable}>
      <Text style={{height: "100%", color: "black" }}>placeholder</Text>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    backgroundColor: "black",
  },
  touchable: {
    height: "100%",
    width: "100%",
    backgroundColor: "red",
  }
});
