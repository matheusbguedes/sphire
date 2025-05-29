import { decode as decodeBase64, encode as encodeBase64 } from "base-64";
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
  const [sensorData, setSensorData] = useState<string | null>(null);

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
      scanMode: 1,
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

      console.log("Conectado ao dispositivo:", connectedDevice.name);

      return true;
    } catch (error) {
      console.log("Erro ao conectar:", error);
      return false;
    } finally {
      setIsConnecting(false);
    }
  }

  async function toggleMeasurement(
    deviceId: string,
    command: "START" | "STOP"
  ) {
    try {
      // UUIDs defined in the Arduino code
      const SERVICE_UUID = "afe84744-3652-4a4d-a5f3-ca3d85aa8207";
      const CONTROL_CHAR_UUID = "8c7d28d4-f658-4c67-9a27-37efb6c9c0f6";
      const SENSOR_CHAR_UUID = "beb82ea1-5c9a-4dfc-9d32-524ae3edc8da";

      console.log("Escrevendo comando:", command);

      // Enviar comando de controle
      await bleManager.writeCharacteristicWithResponseForDevice(
        deviceId,
        SERVICE_UUID,
        CONTROL_CHAR_UUID,
        encodeBase64(command)
      );

      // Se o comando for START, tentar ler o valor
      if (command === "START") {
        console.log("Lendo valor");

        // Função para ler o valor periodicamente
        const readSensorValue = async () => {
          try {
            const characteristic = await bleManager.readCharacteristicForDevice(
              deviceId,
              SERVICE_UUID,
              SENSOR_CHAR_UUID
            );

            if (characteristic?.value) {
              const decodedValue = decodeBase64(characteristic.value);
              setSensorData(decodedValue);

              console.log("Valor lido:", decodedValue);
            }
          } catch (readError) {
            console.log("Erro ao ler característica:", readError);
          }
        };

        readSensorValue();
      }
    } catch (error) {
      console.log("Erro com a medição:", error);
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
    sensorData,
    scanForDevices,
    connectToDevice,
    toggleMeasurement,
  };
}
