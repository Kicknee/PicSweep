import * as SplashScreen from "expo-splash-screen";

import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import ImageViewer from "../components/ImageViewer";
import Settings from "../components/Settings";
import SettingsList from "../components/SettingsList";

export default function Index() {
  const [areSettingsVisible, setAreSettingsVisible] = useState(false);
  const [loaded, error] = useFonts({
    Pacifico: require("@/assets/fonts/Pacifico-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const onOpenSettings = () => {
    setAreSettingsVisible(true);
  };
  const onCloseSettings = () => {
    setAreSettingsVisible(false);
  };
  return (
    <GestureHandlerRootView style={style.container}>
      <View style={style.header}>
        <Text style={style.appTitle}>PicSweep</Text>
        <Pressable onPress={onOpenSettings}>
          <MaterialIcons name="menu" color="#fff" size={42} />
        </Pressable>
      </View>
      <ImageViewer />
      <Settings isVisible={areSettingsVisible} onClose={onCloseSettings}>
        <SettingsList />
      </Settings>
    </GestureHandlerRootView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E67263",
    alignItems: "center",
  },
  header: {
    width: "85%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  appTitle: {
    flex: 1,
    fontFamily: "Pacifico",
    fontSize: 50,
    color: "white",
    marginVertical: 60,
    textAlign: "center",
  },
});
