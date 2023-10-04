import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MainNavigationProp } from "@app/App";
import { colors } from "../constants/Colors";
import Trash from "../assets/Trash.svg";

type ItemData = {
  name: string;
  active: boolean;
  id: number;
};

export default function AdminActivity(): JSX.Element {
  const navigation = useNavigation<MainNavigationProp>();
  const [priestsArray, setPriestsArray] = useState<ItemData[]>([
    { name: "br mateusz", active: true, id: 0 },
    { name: "br Bogumił", active: false, id: 1 },
  ]);

  const storeData = useCallback(async () => {
    try {
      const jsonValue = JSON.stringify({
        activePriest: priestsArray,
        closingHour: "20:30",
        breakHour: "12:45",
      });
      await AsyncStorage.setItem("mainStorage", jsonValue);
    } catch (e) {
      // saving error
    }
  }, [priestsArray]);

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("mainStorage");
  //     if (value !== null) {
  //       // value previously stored
  //       console.log(value);
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  // void getData();

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item?.active ? "#6e3b6e" : "#f9c2ff";
    const color = item?.active ? "white" : "black";

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

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{"Ustawienia"}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.activePriest}>{"Aktywny spowiednik"}</Text>
          <FlatList
            data={priestsArray}
            renderItem={renderItem}
            // keyExtractor={(item) => item.id}
            // extraData={selectedId}
          />
        </View>

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
    justifyContent: "space-between",
  },
  actionBtn: {
    backgroundColor: "#56483b",
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
    paddingBottom: 40,
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
    height: "75%",
    display: "flex",
    alignItems: "center",
  },
  activePriest: {
    color: colors.text.primary,
    fontSize: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  removeBtn: {
    backgroundColor: "red",
  },
  priestWrapper: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
});
