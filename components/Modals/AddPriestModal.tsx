/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../Buttons/Button";
import { Modal } from "./Modal";
import { colors } from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Logger } from "../../services/Logger";

interface AddPriestModalProps {
  modalVisible: boolean;
  closeModal: () => void;
  updateData: () => Promise<void>;
}

export function AddPriestModal(props: AddPriestModalProps) {
  const { closeModal, updateData } = props;
  const [priestName, setPriestName] = useState("");
  const [priestNumber, setPriestNumber] = useState<number>();

  const onConfirm = useCallback(async () => {
    try {
      if (priestName === "" || priestName === null || priestNumber === null) {
        setPriestName("");
        closeModal();

        return;
      }

      const value = await AsyncStorage.getItem("mainStorage");

      if (value) {
        const parsedValue = value != null ? JSON.parse(value) : null;
        const activePriests = parsedValue.activePriest;
        const id = activePriests ? activePriests[activePriests.length - 1].id + 1 : 1;

        const jsonValue = JSON.stringify({
          activePriest: [...activePriests, { name: priestName, active: false, id, number: priestNumber}],
          closingHour: parsedValue.closingHour,
          breakHour: parsedValue.breakHour,
        });
        await AsyncStorage.setItem("mainStorage", jsonValue);

        return;
      }

      const jsonValue = JSON.stringify({
        activePriest: [{ name: priestName, active: false, id: 1, number: priestNumber }],
      });

      await AsyncStorage.setItem("mainStorage", jsonValue);
    } catch (e) {
      Logger.error(e);
    } finally {
      void updateData();
      setPriestName("");
    }
  }, [closeModal, priestName, updateData, priestNumber]);

  return (
    <Modal {...props} closeModal={closeModal}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>{"Imię dodawanego spowiednika"}</Text>

          <TextInput
            style={styles.inputStyles}
            placeholderTextColor={colors.text.primary}
            onChange={({ nativeEvent: { text } }) => setPriestName(text)}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            disableFullscreenUI={true}
            selectionColor={colors.text.primary}
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>{"Numer spowiednika"}</Text>

          <TextInput 
            style={styles.inputStyles}
            placeholderTextColor={colors.text.primary}
            keyboardType='numeric'
            onChange={({ nativeEvent: { text } }) => setPriestNumber(parseInt(text.replace(/[^0-9]/g, '')))}
            maxLength={9}
            autoComplete="off"
            autoCorrect={false}
            disableFullscreenUI={true}
            selectionColor={colors.text.primary}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button variant="simple" text={"wróć"} onPress={() => closeModal()} />
          <Button variant="simple" text={"Dodaj"} onPress={() => void onConfirm()} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
  },
  title: {
    fontFamily: "MyonaSans-Display",
    marginVertical: 10,
  },
  inputStyles: {
    color: "#A7ACB1",
    width: "100%",
    borderRadius: 3,
    paddingHorizontal: 15,
    fontSize: 15,
    fontFamily: "Rubik-Medium",
    borderWidth: 1,
    borderColor: colors.listItem.border,
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
    gap: 40,
  },
});
