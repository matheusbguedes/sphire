import { BluetoothConnection } from "@/screens/bluetooth-connection";
import { DocumentScanner } from "@/screens/document-scanner";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

type AppRoutesType = {
  bluetoothConnection: undefined;
  documentScanner: undefined;
};

export type AppNavigatorRoutesProps = StackNavigationProp<AppRoutesType>;

const { Navigator, Screen } = createStackNavigator<AppRoutesType>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="bluetoothConnection" component={BluetoothConnection} />
      <Screen name="documentScanner" component={DocumentScanner} />
    </Navigator>
  );
}
