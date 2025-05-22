import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { storageDeviceGet } from "@/storage/storageDevice";
import { useNavigation } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Flashlight, FlashlightOff } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function DocumentScanner() {
  const [device, setDevice] = useState<any>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isTorchOn, setIsTorchOn] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleBarcodeScanned({ data }: { data: string }) {
    navigation.navigate("scannedProfile");
  }

  useEffect(() => {
    storageDeviceGet().then((device) => setDevice(device));

    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  if (!permission) return null;

  return (
    <View className="flex-1 gap-4 bg-white">
      <View className="flex-row items-center justify-center gap-2 absolute top-0 left-0 right-0 p-2">
        <Text className="text-center text-zinc-400">Conectado a</Text>
        <View className="flex-row items-center gap-2 bg-black rounded-xl p-2">
          <Text className="text-white font-bold">{device?.name}</Text>
          <View className="w-2 h-2 bg-green-500 rounded-full" />
        </View>
      </View>
      <View className="flex-1 items-center justify-center">
        <View className="relative size-96 overflow-hidden rounded-3xl bg-zinc-200">
          <CameraView
            onBarcodeScanned={handleBarcodeScanned}
            enableTorch={isTorchOn}
            focusable
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
            }}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
          />
          <TouchableOpacity
            onPress={() => setIsTorchOn(!isTorchOn)}
            className="absolute top-4 right-4 bg-black/50 p-3 rounded-full"
          >
            {isTorchOn ? (
              <Flashlight size={24} color="white" />
            ) : (
              <FlashlightOff size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
        <Text className="text-zinc-400 text-lg mt-4">
          Escaneie o documento do abordado
        </Text>
      </View>
    </View>
  );
}
