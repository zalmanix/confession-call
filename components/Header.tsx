import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { colors } from "../constants/Colors";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Header() {
  const [refreshDate, setRefreshDate] = useState(false);

  const hourOfConfession = useMemo(() => {
    const now = dayjs();
    // Check if today is Sunday
    if (now.day() === 0) {
      return "21:00";
    }

    if (now.hour() >= 15) {
      return "20:00";
    } else {
      return "12:45";
    }
  }, [refreshDate]);

  setTimeout(() => {
    setRefreshDate((prev) => !prev);
  }, 5000);

  // useEffect(() => {
  //   const load = async () => {
  //     const value = await AsyncStorage.getItem("mainStorage");
  //     const parsedValue = value != null ? JSON.parse(value) : null;

  //     if (!parsedValue) {
  //       setPriestOnDuty("Błąd ustawień");

  //       return;
  //     }

  //     const priests = parsedValue?.activePriest;
  //     const activePriest = priests?.filter((priest: { active: boolean; name: string }) => priest.active);

  //     setPriestOnDuty(activePriest[0].name as string);
  //   };

  //   void load();
  // }, [refresh]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dyżur spowiedzi do:</Text>

      <Text style={styles.textHour}>{hourOfConfession}</Text>
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
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: "Rubik-Regular",
    paddingBottom: 20,
  },
  textHour: {
    fontSize: 42,
    color: colors.text.primary,
    fontFamily: "Rubik-Regular",
  },
});
