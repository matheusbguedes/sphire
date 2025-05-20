import AsyncStorage from "@react-native-async-storage/async-storage";

import { Device } from "react-native-ble-plx";
import { DEVICE_STORAGE } from "./storageConfig";

export async function storageDeviceSave(device: Device) {
  await AsyncStorage.setItem(DEVICE_STORAGE, JSON.stringify(device));
}

export async function storageDeviceGet() {
  const device = await AsyncStorage.getItem(DEVICE_STORAGE);

  if (!device) return null;

  return JSON.parse(device);
}

export async function storageDeviceRemove() {
  await AsyncStorage.removeItem(DEVICE_STORAGE);
}
