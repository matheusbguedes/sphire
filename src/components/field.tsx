import { Text, View } from "react-native";

type props = {
  label: string;
  value: string;
};

export function Field({ label, value }: props) {
  return (
    <View className="relative flex-1 justify-center max-h-12 border-2 border-zinc-300 rounded-lg px-3 py-2">
      <Text className="absolute -top-3 left-3 bg-white px-1 text-sm text-nowrap font-medium text-zinc-400">
        {label}
      </Text>
      <Text className="text-base text-zinc-900">{value}</Text>
    </View>
  );
}
