import React, { useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";

import { colors } from "../constants/Colors";
import { callNumber } from "../utils/callNumber";
import { Button } from "./Buttons/Button";

import { PHONE_NUMBER } from "@env";

export function DialComponent() {
  const diallNumber = useCallback(() => {
    void callNumber(`${PHONE_NUMBER as string}`);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Przyciśnij przycisk poniżej aby powiadomić brata</Text>

      <Button text={"Powiadom spowiednika"} onPress={diallNumber} style={styles.dialBtn} variant="dial" />
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
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: "Rubik-Regular",
  },
  dialBtn: {
    width: "66%",
    height: 160,
    borderRadius: 20,
    backgroundColor: "#bfb2a1",
    marginRight: "auto",
    marginLeft: "auto",
    fontSize: 40,
  },
});
