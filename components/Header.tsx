import React, { useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { colors } from "../constants/Colors";
import dayjs from "dayjs";

export function Header() {
  const [refresh, setRefresh] = useState(false);

  const hourOfConfession = useMemo(() => {
    const now = dayjs().hour();

    if (now >= 15) return "20:00";
    return "12:45";
  }, [refresh]);

  setTimeout(() => {
    setRefresh((prev) => !prev);
  }, 5000);

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
    fontSize: 18,
    color: colors.text.primary,
    fontFamily: "Rubik-Regular",
  },
  textHour: {
    fontSize: 32,
    color: colors.text.primary,
    fontFamily: "Rubik-Regular",
  },
});
