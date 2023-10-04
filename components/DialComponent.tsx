import React, { useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";

import { colors } from "../constants/Colors";
import { callNumber } from "../utils/callNumber";
import { Button } from "./Buttons/Button";

export function DialComponent() {
  const diallNumber = useCallback(() => {
    void callNumber("123124123");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Przyciśnij przycisk poniżej aby powiadomić brata</Text>

      <Button text={"Powiadom spowiednika"} onPress={diallNumber} style={styles.dialBtn} />
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
    backgroundColor: "white",
    gap: 30,
  },
  text: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: "Rubik-Regular",
  },
  dialBtn: {
    width: "66%",
    height: 60,
    borderRadius: 30,
    backgroundColor: "orange",
    marginRight: "auto",
    marginLeft: "auto",
    fontSize: 30,
  },
});
