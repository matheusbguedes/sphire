import { Button } from "@/components/button";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { CircleAlert, CircleCheck, RefreshCcw } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type props = StaticScreenProps<{
  rawValue: string;
}>;

export function MeasurementResult({ route }: props) {
  const { rawValue } = route.params;

  const [mgL, setMgL] = useState(0);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleCalculateMgL() {
    // Converte o valor bruto do sensor MQ3 para mg/L
    // Fórmula aproximada baseada na curva de resposta do sensor
    const sensorValue = Number(rawValue);

    // Fatores de calibração do sensor MQ3
    const a = 0.0006; // Coeficiente de sensibilidade
    const b = 0.145; // Ponto de interseção

    // Calcula concentração em mg/L
    const alcoholConcentration = a * sensorValue + b;

    // Arredonda para 2 casas decimais
    const mgLValue = Number(alcoholConcentration.toFixed(2));

    setMgL(mgLValue);
  }

  function handleRepeatMeasurement() {
    navigation.navigate("alchoholMeasurement");
  }

  function handleBackToStart() {
    console.log("Back to start pressed");
  }

  useEffect(() => {
    handleCalculateMgL();
  }, [rawValue]);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 gap-6 px-5 pt-6">
        <View className="flex-row justify-between items-center">
          <View className="flex gap-2">
            <Text className="text-base text-zinc-400">Nível de alcoolemia</Text>
            <Text className="text-4xl font-bold text-zinc-800">{mgL} mg/L</Text>
          </View>
          <View
            className={`size-4 ${
              mgL > 0.34 ? "bg-red-500" : "bg-green-500"
            } rounded-full`}
          />
        </View>
        <View className="justify-start">
          <Text className="text-base text-left text-zinc-400">Status</Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-medium text-zinc-800">
              {mgL > 0.34 ? "Crime de trânsito" : "Normal"}
            </Text>
            {mgL > 0.34 && (
              <Text className="text-sm text-zinc-400">Art. 306 do CTB</Text>
            )}
          </View>
        </View>
        <View
          className={`p-4 rounded-2xl ${
            mgL > 0.34 ? "bg-red-50" : "bg-green-50"
          }`}
        >
          <View className="flex-row items-center gap-2 mb-2">
            {mgL > 0.34 ? (
              <CircleAlert size={20} color="#b91c1c" />
            ) : (
              <CircleCheck size={20} color="#16a34a" />
            )}
            <Text
              className={`text-base font-medium ${
                mgL > 0.34 ? "text-red-700" : "text-green-700"
              }`}
            >
              {mgL > 0.34 ? "Autuação" : "Sem alteração"}
            </Text>
          </View>
          {mgL > 0.34 && (
            <View className="gap-2 p-2">
              <Text className="text-red-700">
                • Lavrar auto de prisão em flagrante
              </Text>
              <Text className="text-red-700">• Recolher CNH do condutor</Text>
              <Text className="text-red-700">
                • Aplicar multa de R$ 2.934,70
              </Text>
              <Text className="text-red-700">
                • Suspensão do direito de dirigir por 12 meses
              </Text>
            </View>
          )}
        </View>
      </View>
      <View className="px-8 gap-4">
        <TouchableOpacity
          onPress={handleRepeatMeasurement}
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
