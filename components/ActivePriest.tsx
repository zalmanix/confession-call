/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { colors } from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMain } from "../hooks/context/useMain";

export function ActivePriest() {
  const [priestOnDuty, setPriestOnDuty] = useState("Ładowanie");
  const { refresh } = useMain();

  useEffect(() => {
    const load = async () => {
      const value = await AsyncStorage.getItem("mainStorage");
      const parsedValue = value != null ? JSON.parse(value) : null;

      if (!parsedValue) {
        setPriestOnDuty("Błąd ustawień");

        return;
      }

      const priests = parsedValue?.activePriest;
      const activePriest = priests?.filter((priest: { active: boolean; name: string }) => priest.active);

      setPriestOnDuty(activePriest[0].name as string);
    };

    void load();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <View style={styles.divider}></View>

      <View style={styles.wrapper}>
        <Text style={styles.text}>Aktualnie spowiada:</Text>
        <Text style={styles.text}>{priestOnDuty}</Text>
      </View>

      <View style={styles.divider}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  text: {
    fontSize: 42,
    color: colors.text.primary,
    fontFamily: "Rubik-Regular",
  },
  divider: {
    width: "66%",
    height: 2,
    backgroundColor: "orange",
    marginRight: "auto",
    marginLeft: "auto",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
});
