import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { colors } from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMain } from "../hooks/context/useMain";
import Swiper from "react-native-swiper";

export function ActivePriest() {
  const [priestsOnDuty, setPriestsOnDuty] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { refresh } = useMain();

  useEffect(() => {
    const setActivePriest = async () => {
      const value = await AsyncStorage.getItem("mainStorage");

      if (value) {
        const parsedValue = value != null ? JSON.parse(value) : null;
        const activePriests = parsedValue.activePriest;
        const priestFromSlider = activePriests.map((item: { id: any; name: any; number: any; }, i: number) => {
          if (activeIndex === i) return { active: true, id: item.id, name: item.name, number: item.number };
        
          return { active: false, id: item.id, name: item.name, number: item.number };
        });

        const jsonValue = JSON.stringify({
          activePriest: [...priestFromSlider],
          closingHour: parsedValue.closingHour,
          breakHour: parsedValue.breakHour,
          closingHourSunday: parsedValue.closingHourSunday,
        });
        await AsyncStorage.setItem("mainStorage", jsonValue);

        return;
      }
    }

    setActivePriest();
  },[activeIndex]);

  useEffect(() => {
    const load = async () => {
      const value = await AsyncStorage.getItem("mainStorage");
      const parsedValue = value != null ? JSON.parse(value) : null;

      if (!parsedValue) {
        setPriestsOnDuty([]);

        return;
      }

      const priests = parsedValue?.activePriest;

      setPriestsOnDuty(priests);
    };

    void load();
  }, [refresh]);

  const slides = useMemo(() => {
    return priestsOnDuty.map((priest: {id: number, name: string}) => (
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
          onIndexChanged={(index) => {
            setActiveIndex(index);
          }}
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
