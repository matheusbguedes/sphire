import { AlcoholMeasurement } from "@/screens/alchohol-measurement";
import { BluetoothConnection } from "@/screens/bluetooth-connection";
import { MeasurementResult } from "@/screens/measurement-result";
import { storageDeviceGet } from "@/storage/storageDevice";
import { useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { useEffect } from "react";

type AppRoutesType = {
  bluetoothConnection: undefined;
  alchoholMeasurement: undefined;
  measurementResult: {
    rawValue: string;
  };
};

export type AppNavigatorRoutesProps = StackNavigationProp<AppRoutesType>;

const { Navigator, Screen } = createStackNavigator<AppRoutesType>();

export function AppRoutes() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function handleMiddlewareDevice() {
    const device = await storageDeviceGet();

    if (!device) {
      navigation.navigate("bluetoothConnection");
    }

    navigation.navigate("alchoholMeasurement");
  }

  useEffect(() => {
    handleMiddlewareDevice();
  }, []);

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="bluetoothConnection" component={BluetoothConnection} />
      <Screen name="alchoholMeasurement" component={AlcoholMeasurement} />
      <Screen name="measurementResult" component={MeasurementResult} />
    </Navigator>
  );
}
