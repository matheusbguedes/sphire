import { Button } from "@/components/button";
import { ActivityIndicator, Text, View } from "react-native";

export function AlcoholMeasurement() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#808080" />
      </View>
      <View className="w-full items-center gap-8 px-8">
        <View className="w-full items-center">
          <Text className="text-xl font-semibold text-black">
            Medição em andamento
          </Text>
          <Text className="text-base text-zinc-400">
            Assopre o aparelho por 5 segundos
          </Text>
        </View>
        <Button title="Cancelar" />
      </View>
    </View>
  );
}
