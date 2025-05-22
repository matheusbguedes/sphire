import { Routes } from "@/routes";
import { SafeAreaView, StatusBar } from "react-native";
import "./global.css";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </SafeAreaView>
  );
}
