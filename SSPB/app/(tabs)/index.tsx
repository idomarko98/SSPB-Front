import App from "@/App";
import {LogLevel, OneSignal} from "react-native-onesignal";
import Constants from "expo-constants";

function oneSignal(){
  const ONESIGNAL_APP_ID = "0ca3677c-bc88-478c-b710-bac4bff83fad";

  // const navigation = useNavigation();
  // OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // // OneSignal Initialization
  // OneSignal.initialize(ONESIGNAL_APP_ID);
  //
  // // requestPermission will show the native iOS or Android notification permission prompt.
  // // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  // OneSignal.Notifications.requestPermission(true);
  //
  // // Method for listening for notification clicks
  // OneSignal.Notifications.addEventListener('click', (event) => {
  //   console.log('OneSignal: notification clicked:', event);
  // });

  OneSignal.initialize(Constants.expoConfig!.extra!.oneSignalAppId);

// Also need enable notifications to complete OneSignal setup
  OneSignal.Notifications.requestPermission(true);
}

export default function HomeScreen() {
  oneSignal()

  return (
    <App />
  );
}
