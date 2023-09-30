import SendIntentAndroid from "react-native-send-intent";
import { Logger } from "../services/Logger";
import { PermissionsAndroid } from "react-native";

export const callNumber = async (phone: string) => {
  const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CALL_PHONE);

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    SendIntentAndroid.sendPhoneCall(`+48 ${phone}`, true);
  } else {
    Logger.info("Permission denied");
  }
};
