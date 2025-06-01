import { Button } from "@/components/button";
import { Separator } from "@/components/separator";
import { useBLE } from "@/hooks/useBLE";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import { Bluetooth } from "lucide-react-native";
import { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Device } from "react-native-ble-plx";

export function BluetoothConnection() {
  const {
    devices,
    isScanning,
    isConnecting,
    connectingDeviceId,
    scanForDevices,
    connectToDevice,
  } = useBLE();

  useEffect(() => {
    scanForDevices();
  }, []);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const handleConnectDevice = async (device: Device) => {
    const success = await connectToDevice(device);
    if (success) {
      navigation.navigate("alchoholMeasurement");
    }
  };

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
        <ScrollView className="flex-1 py-3" showsVerticalScrollIndicator={true}>
          <View className="gap-8">
            {devices.map((device) => {
              const isCurrentlyConnecting = connectingDeviceId === device.id;
              return (
                <TouchableOpacity
                  key={device.id}
                  disabled={isConnecting || isCurrentlyConnecting}
                  onPress={() => handleConnectDevice(device)}
                  className="flex-row justify-between items-center"
                >
                  <Text className="text-base flex-1">{device.name}</Text>
                  {isCurrentlyConnecting && (
                    <ActivityIndicator size="small" color="black" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View className="px-8 pb-4">
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
