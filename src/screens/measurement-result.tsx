import { Button } from "@/components/button";
import { CircleAlert, RefreshCcw } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export function MeasurementResult() {
  function handleRepeatMeasurement() {
    console.log("Repeat measurement pressed");
  }

  function handleBackToStart() {
    console.log("Back to start pressed");
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 gap-6 px-5 pt-6">
        <View className="flex-row justify-between items-center">
          <View className="flex gap-2">
            <Text className="text-base text-zinc-400">Nível de alcoolemia</Text>
            <Text className="text-4xl font-bold text-zinc-800">0,34 mg/L</Text>
          </View>
          <View className="size-4 bg-red-500 rounded-full" />
        </View>
        <View className="justify-start">
          <Text className="text-base text-left text-zinc-400">Status</Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-medium text-zinc-800">
              Crime de trânsito
            </Text>
            <Text className="text-sm text-zinc-400">Art. 306 do CTB</Text>
          </View>
        </View>
        <View className="bg-red-50 p-4 rounded-2xl">
          <View className="flex-row items-center gap-2 mb-2">
            <CircleAlert size={20} color="#b91c1c" />
            <Text className="text-base font-semibold text-red-700">
              Autuação
            </Text>
          </View>
          <View className="gap-2 p-2">
            <Text className="text-red-700">
              • Lavrar auto de prisão em flagrante
            </Text>
            <Text className="text-red-700">• Recolher CNH do condutor</Text>
            <Text className="text-red-700">• Aplicar multa de R$ 2.934,70</Text>
            <Text className="text-red-700">
              • Suspensão do direito de dirigir por 12 meses
            </Text>
          </View>
        </View>
      </View>
      <View className="px-8 gap-4">
        <TouchableOpacity
          activeOpacity={0.8}
          className="w-full flex-row items-center justify-center gap-2 bg-white border border-zinc-200 disabled:opacity-80 rounded-full p-4"
        >
          <Text className="text-zinc-800 text-lg font-medium">
            Repetir medição
          </Text>
          <RefreshCcw size={18} color="black" />
        </TouchableOpacity>

        <Button title="Voltar ao início" onPress={handleBackToStart} />
      </View>
    </View>
  );
}
