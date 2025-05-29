import { Button } from "@/components/button";
import { useBLE } from "@/hooks/useBLE";
import { storageDeviceGet } from "@/storage/storageDevice";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Device } from "react-native-ble-plx";

export function AlcoholMeasurement() {
  const { sensorData, toggleMeasurement } = useBLE();

  const [device, setDevice] = useState<Device | null>(null);
  async function getDevice() {
    const device = await storageDeviceGet();
    setDevice(device);
  }

  const handleStartMeasurement = async () => {
    if (!device) return;

    try {
      await toggleMeasurement(device.id, "START");
    } catch (error) {
      console.log(error);
    }
  };

  const handleStopMeasurement = async () => {
    if (!device) return;

    try {
      await toggleMeasurement(device.id, "STOP");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDevice();
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="flex-1 justify-center items-center">
        {sensorData ? (
          <View className="items-center">
            <Text className="text-xl font-semibold text-black">
              Medição em andamento
            </Text>
            <Text className="text-base text-zinc-400">
              Valor atual: {sensorData}
            </Text>
          </View>
        ) : (
          <ActivityIndicator size="large" color="#808080" />
        )}
      </View>
      <View className="w-full items-center gap-8 px-8">
        <View className="w-full items-center">
          <Text className="text-xl font-semibold text-black">
            {sensorData ? "Medição em progresso" : "Iniciar Medição"}
          </Text>
          <Text className="text-base text-zinc-400">
            {sensorData
              ? "Assopre o aparelho por 5 segundos"
              : "Prepare-se para iniciar a medição"}
          </Text>
        </View>
        <Button title="Iniciar Medição" onPress={handleStartMeasurement} />
      </View>
    </View>
  );
}
