import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../Buttons/Button";
import { Modal } from "./Modal";
import { colors } from "../../constants/Colors";

interface ChangeHoursModalProps {
  modalVisible: boolean;
  closeModal: () => void;
  setBreakHour: React.Dispatch<React.SetStateAction<string>>;
  setClosingHour: React.Dispatch<React.SetStateAction<string>>;
  setClosingHourSunday: React.Dispatch<React.SetStateAction<string>>;
}

export function ChangeHoursModal(props: ChangeHoursModalProps) {
  const { closeModal, setBreakHour, setClosingHourSunday, setClosingHour } = props;

  return (
    <Modal {...props} closeModal={closeModal}>
      <View style={styles.container}>
        <View style={styles.hourContainer}>
          <Text style={styles.title}>{"Koniec spowiedzi:"}</Text>

          <TextInput
            style={styles.inputStyles}
            placeholderTextColor={colors.text.primary}
            onChange={({ nativeEvent: { text } }) => setClosingHour(text)}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            disableFullscreenUI={true}
            selectionColor={colors.text.primary}
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.hourContainer}>
          <Text style={styles.title}>{"Koniec spowiedzi niedzielnej:"}</Text>

          <TextInput
            style={styles.inputStyles}
            placeholderTextColor={colors.text.primary}
            onChange={({ nativeEvent: { text } }) => setClosingHourSunday(text)}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            disableFullscreenUI={true}
            selectionColor={colors.text.primary}
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.hourContainer}>
          <Text style={styles.title}>{"Przerwa w spowiedzi:"}</Text>

          <TextInput
            style={styles.inputStyles}
            placeholderTextColor={colors.text.primary}
            onChange={({ nativeEvent: { text } }) => setBreakHour(text)}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            disableFullscreenUI={true}
            selectionColor={colors.text.primary}
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button variant="simple" text={"Wróć"} onPress={() => closeModal()} />
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
  hourContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
