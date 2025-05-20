import { Routes } from "@/routes";
import { SafeAreaView, StatusBar } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </SafeAreaView>
  );
}
