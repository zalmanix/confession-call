import React, { useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";

import { colors } from "../constants/Colors";
import { callNumber } from "../utils/callNumber";
import { Button } from "./Buttons/Button";

import { PHONE_NUMBER } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function DialComponent() {
  const diallNumber = useCallback(async () => {
    const value = await AsyncStorage.getItem("mainStorage");
    const parsedValue = value != null ? JSON.parse(value) : null;
    const activePriestNumber = parsedValue.activePriest.filter((priest: any) => priest.active);

    if (activePriestNumber[0].number) {
      void callNumber(`${activePriestNumber[0].number as string}`)

      return
    }

    void callNumber(`${PHONE_NUMBER}`);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>By wezwać spowiednika</Text>

      <Button text={"Naciśnij tutaj"} onPress={diallNumber} style={styles.dialBtn} variant="dial" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 80,
    gap: 30,
  },
  text: {
    fontSize: 40,
    color: colors.text.blue,
    fontFamily: "MyonaSans-Display",
    textTransform: "capitalize",
  },
  dialBtn: {
    width: "60%",
    height: 160,
    borderRadius: 20,
    backgroundColor: colors.text.blue,
    marginRight: "auto",
    marginLeft: "auto",
  },
});
