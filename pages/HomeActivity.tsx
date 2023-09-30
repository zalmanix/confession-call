import React, { useCallback } from "react";
import { Button } from "../components/Buttons/Button";
import { callNumber } from "../utils/callNumber";
import { Header } from "../components/Header";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function HomeActivity(): JSX.Element {
  const diallNumber = useCallback(() => {
    void callNumber("123124123");
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <View style={{ flex: 1 }}>
        <Header />

        <Button text={"dialme"} onPress={diallNumber} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
  },
});
