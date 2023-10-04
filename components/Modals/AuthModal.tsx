import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../Buttons/Button";
import { Modal } from "./Modal";
import { colors } from "../../constants/Colors";

interface RFIDAlreadyScannedModalProps {
  modalVisible: boolean;
  closeModal: () => void;
  confirmModal: () => void;
  setPasswordValue: React.Dispatch<React.SetStateAction<string>>;
}

export function AuthModal(props: RFIDAlreadyScannedModalProps) {
  const { closeModal, confirmModal, setPasswordValue } = props;

  return (
    <Modal {...props} closeModal={closeModal}>
      <View style={styles.container}>
        <Text style={styles.title}>{"Podaj Hasło"}</Text>

        <TextInput
          style={styles.inputStyles}
          placeholderTextColor={colors.text.primary}
          secureTextEntry={true}
          onChange={({ nativeEvent: { text } }) => setPasswordValue(text)}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          disableFullscreenUI={true}
          selectionColor={colors.text.primary}
          underlineColorAndroid="transparent"
        />

        <View style={styles.buttonWrapper}>
          <Button variant="simple" text={"wróć"} onPress={() => closeModal()} />
          <Button variant="simple" text={"Ok"} onPress={() => confirmModal()} />
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
