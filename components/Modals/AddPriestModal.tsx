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

  const onConfirm = useCallback(async () => {
    try {
      if (priestName === "" || priestName === null) {
        setPriestName("");
        closeModal();

        return;
      }

      const value = await AsyncStorage.getItem("mainStorage");

      if (value) {
        const parsedValue = value != null ? JSON.parse(value) : null;
        const activePriests = parsedValue.activePriest;
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        const id = activePriests ? activePriests[activePriests.length - 1].id + 1 : 1;

        const jsonValue = JSON.stringify({
          activePriest: [...activePriests, { name: priestName, active: false, id }],
          closingHour: parsedValue.closingHour,
          breakHour: parsedValue.breakHour,
        });
        await AsyncStorage.setItem("mainStorage", jsonValue);

        return;
      }

      const jsonValue = JSON.stringify({
        activePriest: [{ name: priestName, active: false, id: 1 }],
      });

      await AsyncStorage.setItem("mainStorage", jsonValue);
    } catch (e) {
      Logger.error(e);
    } finally {
      void updateData();
      setPriestName("");
    }
  }, [closeModal, priestName, updateData]);

  return (
    <Modal {...props} closeModal={closeModal}>
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
    fontFamily: "Rubik-Bold",
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
