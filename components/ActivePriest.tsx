/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { colors } from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMain } from "../hooks/context/useMain";
import Swiper from "react-native-swiper";

export function ActivePriest() {
  const [priestsOnDuty, setPriestsOnDuty] = useState([]);
  // const [activeId, setActiveId] = useState();
  const { refresh } = useMain();

  useEffect(() => {
    const load = async () => {
      const value = await AsyncStorage.getItem("mainStorage");
      const parsedValue = value != null ? JSON.parse(value) : null;

      if (!parsedValue) {
        setPriestsOnDuty([]);

        return;
      }

      const priests = parsedValue?.activePriest;
      // const activePriest = priests?.filter((priest: { active: boolean; name: string }) => priest.active);

      // setActiveId(activePriest.id);
      setPriestsOnDuty(priests);
    };

    void load();
  }, [refresh]);

  const slides = useMemo(() => {
    return priestsOnDuty.map((priest) => (
      <View style={styles.slide} key={priest.id}>
        <Text style={styles.textSlide}>{priest.name}</Text>
      </View>
    ));
  }, [priestsOnDuty]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>Obecnie spowiada:</Text>

        <Swiper
          style={styles.swiperWrapper}
          showsButtons={false}
          showsPagination={false}
          onTouchEnd={() => {}}
          // onIndexChanged={(index) => {
          //   console.log(index);
          // }}
        >
          {slides}
        </Swiper>
      </View>
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
  },
  text: {
    fontSize: 45,
    color: colors.text.blue,
    fontFamily: "MyonaSans-Display",
    textTransform: "uppercase",
  },
  textSlide: {
    fontSize: 80,
    color: colors.text.primary,
    fontFamily: "MyonaSans-Display",
    textTransform: "uppercase",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
    maxHeight: 250,
  },
  swiperWrapper: {
    height: 100,
  },
  slide: {
    flex: 1,
    maxHeight: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
