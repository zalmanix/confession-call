import React from "react";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator, View } from "react-native";
import { Conditional } from "../Wrappers/Conditional";
import { colors } from "../../constants/Colors";
import { Row } from "../Containers/Row";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary" | "simple" | "dial";
  text?: string;
  isLoading?: boolean;
}

export function Button(props: ButtonProps) {
  const { text, isLoading = false, variant = "primary", style, onPress, disabled } = props;

  return (
    <TouchableOpacity
      accessible={true}
      disabled={disabled}
      onPress={!isLoading ? onPress : undefined}
      style={[styles.container, !disabled ? styles[variant] : styles.disabled, style]}>
      <Conditional
        condition={!isLoading}
        trueRender={
          <Row style={styles.row}>
            <Text style={!disabled ? styles[`text${variant}`] : styles.textdisabled}>{text?.toUpperCase()}</Text>
          </Row>
        }
        falseRender={
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color={colors.activityIndicator.dark} />
          </View>
        }
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 37,
    width: 136,
    alignItems: "center",
    justifyContent: "center",
  },
  containerWithIcon: {
    width: 150,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  disabled: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.disabled,
  },
  simple: {
    alignItems: "flex-start",
    width: "auto",
  },
  dial: {},
  textprimary: {
    color: colors.text.dark,
    fontFamily: "Rubik-Medium",
    fontSize: 13,
    textAlign: "center",
  },
  textsecondary: {
    color: colors.text.blue,
    fontFamily: "Rubik-Medium",
    fontSize: 13,
    textAlign: "center",
  },
  textsimple: {
    color: colors.text.blue,
    fontFamily: "Rubik-Medium",
    fontSize: 13,
    textAlign: "center",
  },
  textdial: {
    color: colors.text.dark,
    fontFamily: "Rubik-Medium",
    fontSize: 33,
    textAlign: "center",
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center", // center horizontally
    alignItems: "center", // center vertically
  },
  row: {
    alignItems: "center",
    justifyContent: "center",
  },
});
