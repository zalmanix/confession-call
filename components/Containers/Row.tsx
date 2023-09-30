import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

export function Row({ children, style }: ViewProps) {
  return <View style={[styles.row, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});
