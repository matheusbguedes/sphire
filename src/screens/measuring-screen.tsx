import { Button } from "@/components/button";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Text, View } from "react-native";

export function MeasuringScreen() {


  return (
    <View className="flex-1 justify-between bg-white p-8 pb-12"><View />
      <View className="items-center gap-3">
        <ActivityIndicator size="large" color="#808080" />
        <Text className="text-xl font-semibold text-black">
          Medição em andamento
        </Text>
        <Text className="text-base text-zinc-500">
          Assopre o aparelho por 5 segundos.
        </Text>
      </View>
      <Button title="Cancelar"/>
    </View>
    
  );
}