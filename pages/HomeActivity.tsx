import React, { useCallback, useEffect, useState } from "react";

import { Header } from "../components/Header";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivePriest } from "../components/ActivePriest";
import { DialComponent } from "../components/DialComponent";
import { useNavigation } from "@react-navigation/native";
import { MainNavigationProp } from "@app/App";
import { Conditional } from "../components/Wrappers/Conditional";
import { AuthModal } from "../components/Modals/AuthModal";
import { DEFAULT_PASSWORD } from "@env";
import Gear from "../assets/Gear.svg";
import { useMain } from "../hooks/context/useMain";
import { CHECK_ASLEEP_INTERVAL } from "../constants/Constants";

export default function HomeActivity(): JSX.Element {
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const { isAsleep } = useMain();

  const navigation = useNavigation<MainNavigationProp>();

  const checkSystemTime = useCallback(() => {
    if (isAsleep) navigation.navigate("Sleep");

    setTimeout(checkSystemTime, CHECK_ASLEEP_INTERVAL);
  }, [isAsleep, navigation]);

  useEffect(() => {
    const interval = setTimeout(checkSystemTime, CHECK_ASLEEP_INTERVAL);

    return () => clearTimeout(interval);
  }, [checkSystemTime]);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.wrapper}>
        <Header />

        <ActivePriest />

        <DialComponent />

        <TouchableOpacity style={styles.adminBtn} onPress={() => setIsAuthModalVisible(true)}>
          <Gear width="40" height="40" />
        </TouchableOpacity>
      </View>

      <Conditional
        condition={isAuthModalVisible}
        trueRender={
          <AuthModal
            modalVisible={isAuthModalVisible}
            closeModal={() => setIsAuthModalVisible(false)}
            confirmModal={() => {
              if (passwordValue === DEFAULT_PASSWORD) {
                setPasswordValue("");
                setIsAuthModalVisible(false);
                navigation.navigate("Admin");
              }
            }}
            setPasswordValue={setPasswordValue}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    backgroundColor: "black",
  },
  wrapper: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  adminBtn: {
    height: 50,
    width: 50,
    position: "absolute",
    bottom: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
