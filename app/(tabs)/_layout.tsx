import React from "react";
import { HomeScreenPage } from "@/app/pages/HomeScreen";
import { initializeApp } from "@firebase/app";
import { OneSignal } from "react-native-onesignal";
import Constants from "expo-constants";
import { firebaseConfig } from "@/config/firebaseConfig";

function initFirebase() {
  initializeApp(firebaseConfig);
}

function initOneSignal() {
  OneSignal.initialize(Constants.expoConfig!.extra!.oneSignalAppId);

  // Also need enable notifications to complete OneSignal setup
  OneSignal.Notifications.requestPermission(true);
}

export default function TabLayout() {
  initFirebase();
  initOneSignal();

  return <HomeScreenPage />;
}
