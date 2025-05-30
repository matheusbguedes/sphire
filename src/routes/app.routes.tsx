import { AlcoholMeasurement } from "@/screens/alchohol-measurement";
import { BluetoothConnection } from "@/screens/bluetooth-connection";
import { DocumentScanner } from "@/screens/document-scanner";
import { MeasurementResult } from "@/screens/measurement-result";
import { ScannedProfile } from "@/screens/scanned-profile";
import { useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { useEffect } from "react";

type AppRoutesType = {
  bluetoothConnection: undefined;
  documentScanner: undefined;
  scannedProfile: undefined;
  alchoholMeasurement: undefined;
  measurementResult: undefined;
};

export type AppNavigatorRoutesProps = StackNavigationProp<AppRoutesType>;

const { Navigator, Screen } = createStackNavigator<AppRoutesType>();

export function AppRoutes() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  useEffect(() => {
    navigation.navigate("measurementResult");
  }, []);

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="bluetoothConnection" component={BluetoothConnection} />
      <Screen name="documentScanner" component={DocumentScanner} />
      <Screen name="scannedProfile" component={ScannedProfile} />
      <Screen name="alchoholMeasurement" component={AlcoholMeasurement} />
      <Screen name="measurementResult" component={MeasurementResult} />
    </Navigator>
  );
}
