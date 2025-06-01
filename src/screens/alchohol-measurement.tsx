import { Button } from "@/components/button";
import { useBLE } from "@/hooks/useBLE";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { storageDeviceGet } from "@/storage/storageDevice";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Device } from "react-native-ble-plx";

export function AlcoholMeasurement() {
  const { data, handleMeasurement } = useBLE();

  const [device, setDevice] = useState<Device | null>(null);
  const [isMeasuring, setIsMeasuring] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function getDevice() {
    const device = await storageDeviceGet();
    setDevice(device);
  }

  async function handleStartMeasurement() {
    if (!device) return;

    setIsMeasuring(true);

    try {
      await handleMeasurement(device.id);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleResult(data: string) {
    if (!device) return;

    try {
      navigation.navigate("measurementResult", { rawValue: data });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDevice();
  }, []);

  useEffect(() => {
    if (data) handleResult(data);
  }, [data]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="flex-1 justify-center items-center">
        <View className="bg-zinc-100 rounded-full items-center justify-center p-8">
          <Text className="text-5xl">🍺</Text>
        </View>
      </View>
      <View className="w-full items-center gap-5 px-8 pb-4">
        <View className="w-full items-center">
          <Text className="text-xl font-semibold text-zinc-900">
            {isMeasuring ? "Realizando medição" : "Pronto para iniciar"}
          </Text>
          <Text className="text-base text-zinc-400">
            {isMeasuring
              ? "assopre continuamente durante 5 segundos"
              : "clique no botão abaixo para iniciar a medição"}
          </Text>
        </View>
        <Button
          title="Iniciar Medição"
          isLoading={isMeasuring}
          onPress={handleStartMeasurement}
        />
      </View>
    </View>
  );
}
