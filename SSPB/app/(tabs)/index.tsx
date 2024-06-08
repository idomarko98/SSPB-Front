import App from "@/App";
import {OneSignal} from "react-native-onesignal";
import Constants from "expo-constants";

function oneSignal() {
    OneSignal.initialize(Constants.expoConfig!.extra!.oneSignalAppId);

// Also need enable notifications to complete OneSignal setup
    OneSignal.Notifications.requestPermission(true);
}

export default function HomeScreen() {
    oneSignal()

    return (
        <App/>
    );
}
