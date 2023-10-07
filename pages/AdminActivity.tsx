/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

type ItemData = {
  name: string;
  active: boolean;
  id: number;
};

export default function AdminActivity(): JSX.Element {
  const navigation = useNavigation<MainNavigationProp>();
  const [priestsArray, setPriestsArray] = useState<ItemData[]>([]);
  const [isPriestModalVisible, setIsPriestModalVisible] = useState(false);
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);
  const { setRefresh } = useMain();

  const storeData = useCallback(async () => {
    try {
      const jsonValue = JSON.stringify({
        activePriest: priestsArray,
        closingHour: "20:30",
        breakHour: "12:45",
      });

      await AsyncStorage.setItem("mainStorage", jsonValue);
      setRefresh((prev) => !prev);
    } catch (e) {
      Logger.error(e);
    }
  }, [priestsArray, setRefresh]);

  const getData = async () => {
    if (isFirstLoaded) return;

    try {
      const value = await AsyncStorage.getItem("mainStorage");
      const parsedValue = value != null ? JSON.parse(value) : null;

      if (!parsedValue) {
        setPriestsArray([]);

        return;
      }

      setPriestsArray(parsedValue.activePriest as ItemData[]);
      setIsFirstLoaded(true);
    } catch (e) {
      Logger.error(e);
    }
  };

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item?.active ? "#a97a57" : "#bfb2a1";
    const color = item?.active ? "black" : "#56483b";

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
          <Text style={[styles.title, { color }]}>{item.name}</Text>
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
            <Text style={styles.activePriest}>{"Aktywny spowiednik"}</Text>

            <TouchableOpacity style={styles.actionBtn} onPress={() => setIsPriestModalVisible(true)}>
              <Text>{"Dodaj spowiednika"}</Text>
            </TouchableOpacity>
          </View>

          <FlatList style={styles.flatlist} data={priestsArray} renderItem={renderItem} />
        </View>

        <View style={styles.subContent}></View>

        <View style={styles.btnWrapper}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {
              navigation.navigate("Home");
            }}>
            <Text>{"wróć"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {
              void storeData();
            }}>
            <Text>{"zapisz zmiany"}</Text>
          </TouchableOpacity>
        </View>

        <Conditional
          condition={isPriestModalVisible}
          trueRender={
            <AddPriestModal modalVisible={isPriestModalVisible} closeModal={() => setIsPriestModalVisible(false)} />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
  },
  wrapper: {
    height: "100%",
    display: "flex",
  },
  actionBtn: {
    backgroundColor: "#9a5938",
    width: "33%",
    height: 60,
    borderRadius: 30,
    marginRight: "auto",
    marginLeft: "auto",
    fontSize: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnWrapper: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 40,
  },
  headerText: {
    color: colors.text.primary,
    fontSize: 42,
  },
  header: {
    padding: 30,
    paddingBottom: 20,
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
    height: "auto",
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
    fontSize: 20,
  },
  item: {
    padding: 15,
    marginVertical: 8,
    minWidth: "60%",
  },
  title: {
    fontSize: 32,
    textTransform: "capitalize",
    color: "#56483b",
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
});
