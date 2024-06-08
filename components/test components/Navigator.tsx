import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainTestPage } from "../MainTestPage";
import { DeviceStatusTestPage } from "./DeviceStatusTestPage";
import { RebootTestPage } from "./RebootTestPage";
import { LowBatteryTestPage } from "./SetBatteryAlertTestPage";
import { AutoLockTestPage } from "./SetAutolockTestPage";
import { SetAddressTestPage } from "./SetAddressTestPage";
import { AlarmStatusTestPage } from "./AlarmStatusTestPage";
import { AutoSensorTestPage } from "./SetAutoSensorTestPage";
import { AlarmPitchTestPage } from "./SetAlarmPitchTestPage";
import { DisengageTestPage } from "./DisengageTestPage";
import { LockStateTestPage } from "./GetLockStateTestPage";
import { GeneralFailureTestPage } from "./GeneralFailureTestPage";
import { BatteryTestPage } from "./BatteyTestPage";
import { DeviceStatusAutoTestPage } from "./DeviceStatusAutoTestPage";
import { DeviceStatusTestPageBluetooth } from "./DeviceStatusTestPageBluetooth";

const Stack = createNativeStackNavigator();

export const Navigatiotr = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator initialRouteName="MainTestPage">
      <Stack.Screen name="MainTestPage" component={MainTestPage} />
      <Stack.Screen
        name="DeviceStatusTestPage"
        component={DeviceStatusTestPage}
      />
      <Stack.Screen
        name="DeviceStatusTestPageBluetooth"
        component={DeviceStatusTestPageBluetooth}
      />
      <Stack.Screen name="Test Reboot" component={RebootTestPage} />
      <Stack.Screen
        name="Test Set Battery Alert"
        component={LowBatteryTestPage}
      />
      <Stack.Screen name="Test autolock" component={AutoLockTestPage} />
      <Stack.Screen name="Test server address" component={SetAddressTestPage} />
      <Stack.Screen name="Test alarm status" component={AlarmStatusTestPage} />
      <Stack.Screen name="Test autosensor" component={AutoSensorTestPage} />
      <Stack.Screen name="Test alarm pitch" component={AlarmPitchTestPage} />
      <Stack.Screen name="Test disengage" component={DisengageTestPage} />
      <Stack.Screen name="Test barrier status" component={LockStateTestPage} />
      <Stack.Screen
        name="Test general failure"
        component={GeneralFailureTestPage}
      />
      <Stack.Screen name="Test battery status" component={BatteryTestPage} />
      <Stack.Screen
        name="Test device status autoupdate"
        component={DeviceStatusAutoTestPage}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};
