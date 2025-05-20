import { Button } from "@/components/button";
import { Separator } from "@/components/separator";
import { useBLE } from "@/hooks/useBLE";
import { Bluetooth } from "lucide-react-native";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function BluetoothConnection() {
  const { devices, isScanning, isConnecting, scanForDevices, connectToDevice } =
    useBLE();

  useEffect(() => {
    scanForDevices();
  }, []);

  return (
    <View className="flex-1 gap-4 bg-white">
      <View className="items-center mt-4">
        <View className="w-20 h-20 bg-black rounded-full items-center justify-center mb-4">
          <Bluetooth size={40} color="white" />
        </View>
      </View>
      <View className="flex-1 gap-3 px-8">
        <Text className="font-medium text-zinc-400">Dispositivos</Text>
        <Separator />
        <View className="flex-1 overflow-y-auto gap-8 mt-4">
          {devices.map((device) => {
            return (
              <TouchableOpacity
                key={device.id}
                disabled={isConnecting}
                onPress={() => connectToDevice(device)}
                className="flex-row justify-between items-center"
              >
                <Text className="text-base">
                  {device.name || "Dispositivo sem nome"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View className="px-8">
        <Button
          title="Buscar"
          isLoading={isScanning}
          disabled={isConnecting || isScanning}
          onPress={scanForDevices}
        />
      </View>
    </View>
  );
}
