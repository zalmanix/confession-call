import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MainNavigationProp } from "@app/App";
import { colors } from "../constants/Colors";
import Trash from "../assets/Trash.svg";
import { useMain } from "../hooks/context/useMain";
import { Logger } from "../services/Logger";
import { Conditional } from "../components/Wrappers/Conditional";
import { AddPriestModal } from "../components/Modals/AddPriestModal";
import { ChangeHoursModal } from "../components/Modals/ChangeHoursModal";

export type ItemData = {
  name: string;
  active: boolean;
  number: number;
  id: number;
};

export default function AdminActivity(): JSX.Element {
  const [isPriestModalVisible, setIsPriestModalVisible] = useState(false);
  const [isHoursModalVisible, setIsHoursModalVisible] = useState(false);
  const [priestsArray, setPriestsArray] = useState<ItemData[]>([]);
  const [closingHourSunday, setClosingHourSunday] = useState("21:00");
  // const [isFirstLoaded, setIsFirstLoaded] = useState(false);
  const navigation = useNavigation<MainNavigationProp>();
  const [closingHour, setClosingHour] = useState("20:30");
  const [breakHour, setBreakHour] = useState("12:45");

  const { setRefresh } = useMain();

  const storeData = useCallback(async () => {
    try {
      const jsonValue = JSON.stringify({
        activePriest: priestsArray,
        closingHourSunday,
        closingHour,
        breakHour,
      });

      await AsyncStorage.setItem("mainStorage", jsonValue);
      setRefresh((prev) => !prev);
    } catch (e) {
      Logger.error(e);
    }
  }, [breakHour, closingHour, closingHourSunday, priestsArray, setRefresh]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("mainStorage");
      const parsedValue = value != null ? JSON.parse(value) : null;

      if (!parsedValue) {
        setPriestsArray([]);

        return;
      }

      setPriestsArray(parsedValue.activePriest as ItemData[]);
    } catch (e) {
      Logger.error(e);
    }
  };

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = colors.text.blue;
    const color = colors.text.primary;

    return (
      <View style={styles.priestWrapper}>
        <TouchableOpacity
          onPress={() => {
            setPriestsArray((prevArray) => {
              const array = prevArray.map((prevItem) => {
                if (prevItem.active) prevItem.active = false;

                if (item.id === prevItem.id) item.active = true;

                return prevItem;
              });

              return array;
            });
          }}
          style={[styles.item, { backgroundColor }]}>
          <Text style={[styles.title, { color }]}>{item.name}:</Text>

          <Text style={[styles.title, { color, paddingLeft: 10 }]}>{item.number}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setPriestsArray((prevArray) => prevArray.filter((arrayItem) => item.id !== arrayItem.id));
          }}>
          <Trash width={24} height={24} />
        </TouchableOpacity>
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      void getData();

      return () => {};
    }, []),
  );

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{"Ustawienia"}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.contentHeaderWrapper}>
            <Text style={styles.activePriest}>{"Spowiednicy"}</Text>

            <TouchableOpacity style={styles.actionBtn} onPress={() => setIsPriestModalVisible(true)}>
              <Text style={styles.actionBtnText}>{"Dodaj spowiednika"}</Text>
            </TouchableOpacity>
          </View>

          <FlatList style={styles.flatlist} data={priestsArray} renderItem={renderItem} />
        </View>

        {/* <View style={styles.subContent}>
          <Text style={styles.activePriest}>{"Zmiany godzinowe"}</Text>

          <View style={styles.hourWrapper}>
            <View style={styles.hourContainer}>
              <View style={styles.hour}>
                <Text style={styles.hourText}>{`Koniec spowiedzi: ${closingHour}`}</Text>
              </View>

              <View style={styles.hour}>
                <Text style={styles.hourText}>{`Koniec spowiedzi niedzielnej: ${closingHourSunday}`}</Text>
              </View>

              <View style={styles.hour}>
                <Text style={styles.hourText}>{`Przerwa w spowiedzi: ${breakHour}`}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.actionBtn, { marginTop: 20 }]}
              onPress={() => setIsHoursModalVisible(true)}>
              <Text style={styles.actionBtnText}>{"Zmień godziny"}</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {
              void storeData();
              navigation.navigate("Home");
            }}>
            <Text style={styles.actionBtnText}>{"zapisz i wróć"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {
              void storeData();
            }}>
            <Text style={styles.actionBtnText}>{"zapisz zmiany"}</Text>
          </TouchableOpacity>
        </View>

        <Conditional
          condition={isPriestModalVisible}
          trueRender={
            <AddPriestModal
              modalVisible={isPriestModalVisible}
              closeModal={() => setIsPriestModalVisible(false)}
              updateData={() => getData()}
            />
          }
        />

        <Conditional
          condition={isHoursModalVisible}
          trueRender={
            <ChangeHoursModal
              modalVisible={isHoursModalVisible}
              closeModal={() => setIsHoursModalVisible(false)}
              setClosingHourSunday={setClosingHourSunday}
              setClosingHour={setClosingHour}
              setBreakHour={setBreakHour}
            />
          }
        />
      </View>
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
  },
  actionBtn: {
    backgroundColor: colors.text.blue,
    width: "40%",
    height: 60,
    borderRadius: 30,
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  actionBtnText: {
    textTransform: "capitalize",
    color: colors.woody.darkText,
    fontSize: 20,
    fontFamily: "MyonaSans-Display",
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 100,
  },
  headerText: {
    color: colors.text.primary,
    fontSize: 42,
    fontFamily: "MyonaSans-Display",
  },
  header: {
    padding: 30,
    paddingBottom: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    height: "45%",
    display: "flex",
    paddingHorizontal: 50,
  },
  subContent: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    display: "flex",
    justifyContent: "flex-start",
  },
  contentHeaderWrapper: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    gap: 40,
    paddingBottom: 20,
  },
  activePriest: {
    color: colors.text.primary,
    fontSize: 32,
    fontFamily: "MyonaSans-Display",
  },
  item: {
    padding: 15,
    marginVertical: 8,
    minWidth: "60%",
    display: "flex",
    flexDirection: "row"
  },
  title: {
    fontSize: 32,
    textTransform: "capitalize",
    color: "#56483b",
    fontFamily: "MyonaSans-Display",
  },
  removeBtn: {
    backgroundColor: "red",
  },
  priestWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  flatlist: {
    paddingVertical: 20,
  },
  hourContainer: {
    display: "flex",
    paddingTop: 10,
  },
  hourWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  hour: {
    display: "flex",
  },
  hourText: {
    color: colors.text.primary,
    fontSize: 22,
  },
});
