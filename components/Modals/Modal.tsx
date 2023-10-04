import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import ReactModal from "react-native-modal";
import { colors } from "../../constants/Colors";

interface ModalProps {
  modalVisible: boolean;
  closeModal: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Modal({ modalVisible, closeModal, children, style }: React.PropsWithChildren<ModalProps>) {
  return (
    <ReactModal
      isVisible={modalVisible}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      style={styles.modal}
      supportedOrientations={["landscape"]}
      statusBarTranslucent>
      <View testID="modal">
        <View style={[styles.modalView, style]}>{children}</View>
      </View>
    </ReactModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  modalView: {
    backgroundColor: colors.background,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 418,
    height: 252,
    alignSelf: "center",
  },
});
