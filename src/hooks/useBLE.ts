import * as ExpoDevice from "expo-device";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import { storageDeviceSave } from "../storage/storageDevice";

const bleManager = new BleManager();

export function useBLE() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  async function requestPermissions() {
    if (Platform.OS === "android") {
      const bluetoothScanPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
          title: "Permissão de Busca Bluetooth",
          message: "Necessário para encontrar dispositivos próximos",
          buttonNeutral: "Perguntar depois",
          buttonNegative: "Cancelar",
          buttonPositive: "OK",
        }
      );

      const bluetoothConnectPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: "Permissão de Conexão Bluetooth",
          message: "Necessário para conectar aos dispositivos",
          buttonNeutral: "Perguntar depois",
          buttonNegative: "Cancelar",
          buttonPositive: "OK",
        }
      );

      const locationPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permissão de Localização",
          message:
            "O aplicativo precisa de acesso à localização para encontrar dispositivos Bluetooth.",
          buttonNeutral: "Perguntar depois",
          buttonNegative: "Cancelar",
          buttonPositive: "OK",
        }
      );

      return (
        bluetoothScanPermission === PermissionsAndroid.RESULTS.GRANTED &&
        bluetoothConnectPermission === PermissionsAndroid.RESULTS.GRANTED &&
        locationPermission === PermissionsAndroid.RESULTS.GRANTED
      );
    } else {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === "granted";
    }
  }

  async function scanForDevices() {
    const isPermissionGranted = await requestPermissions();
    if (!isPermissionGranted) return;

    if (!ExpoDevice.isDevice) return;

    setIsScanning(true);
    const foundDevices = new Map<string, Device>();

    bleManager.stopDeviceScan();

    const scanOptions = {
      allowDuplicates: false,
      scanMode: 2,
      timeout: 10000, // 10 seconds
    };

    bleManager.startDeviceScan(null, scanOptions, (error, device) => {
      if (error) return;

      if (device) {
        foundDevices.set(device.id, device);
        setDevices(Array.from(foundDevices.values()));
      }
    });

    setTimeout(() => setIsScanning(false), 10000);
  }

  async function connectToDevice(device: Device) {
    try {
      setIsConnecting(true);

      const connectedDevice = await bleManager.connectToDevice(device.id);
      await connectedDevice.discoverAllServicesAndCharacteristics();

      await storageDeviceSave(connectedDevice);

      return true;
    } catch (error) {
      console.log("Erro ao conectar:", error);
      return false;
    } finally {
      setIsConnecting(false);
    }
  }

  useEffect(() => {
    return () => {
      bleManager.destroy();
    };
  }, []);

  return {
    devices,
    isScanning,
    isConnecting,
    scanForDevices,
    connectToDevice,
  };
}
