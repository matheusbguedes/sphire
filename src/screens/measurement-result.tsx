import { Button } from "@/components/button";
import { useNavigation } from "@react-navigation/native"; 
import { RefreshCcw } from "lucide-react-native"; 
import { Text, TouchableOpacity, View } from "react-native";


export function MeasurementResultScreen() {

  const handleRepeatMeasurement = () => {
    console.log("Repeat measurement pressed");
  };

  const handleNewMeasurement = () => {
    console.log("New measurement pressed");
  };

  return (
    <View className="flex-1 bg-white p-8 justify-between">
      <View className="gap-6">
        <View className="flex-row justify-between items-start">
          <View>
            <Text className="text-base text-zinc-500 mb-1">Nível de alcoolemia</Text>
            <Text className="text-4xl font-bold text-black">0,34 mg/L</Text>
          </View>
          <View className="w-4 h-4 bg-red-500 rounded-full mt-2" />

        </View>

        <View className="flex-row justify-between items-end">
          <View>
            <Text className="text-base text-zinc-500 mb-1">Status</Text>
            <Text className="text-lg font-medium text-black">Crime de trânsito</Text>
          </View>
          <Text className="text-sm text-zinc-400">Art. 306 do CTB</Text>
        </View>

        <View className="gap-4 mt-4">
          <View className="h-6 w-20 bg-zinc-100 rounded" />
          <View className="h-20 bg-zinc-100 rounded" />
          <View className="h-6 bg-zinc-100 rounded" />
          <View className="h-20 bg-zinc-100 rounded" />
        </View>
      </View>

      <View className="gap-4">
        <TouchableOpacity
          className="flex-row items-center justify-center gap-2 py-3"
          onPress={handleRepeatMeasurement}
          activeOpacity={0.7}
        >
          <Text className="text-base font-medium text-black">Repetir medição</Text>
          <RefreshCcw size={18} color="black" />
        </TouchableOpacity>

        <Button
          title="Nova medição"
          onPress={handleNewMeasurement}
        />
      </View>
    </View>
  );
}