import * as SplashScreen from "expo-splash-screen";

import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Text, View, StyleSheet } from "react-native";

import ImageViewer from "./components/ImageViewer";

export default function Index() {
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

  return (
    <View style={style.container}>
      <View>
        <Text style={style.appTitle}>PicSweep</Text>
      </View>
      <ImageViewer />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E67263",
    alignItems: "center",
  },
  appTitle: {
    fontFamily: "Pacifico",
    fontSize: 64,
    color: "white",
    marginVertical: 40,
  },
  imageContainer: {
    width: "70%",
    height: "60%",
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    transform: "rotate(6deg)",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 35,
    borderColor: "white",
    borderWidth: 14,
  },
  iconsTaskbar: {
    zIndex: 3,
    width: 70,
    height: 150,
  },
  iconsTaskbarLeft: {
    alignItems: "flex-start",
    transform: "translate(30px, -30px)",
  },

  iconsTaskbarRight: {
    alignItems: "flex-end",
    transform: "translate(-30px, 30px)",
  },
  icon: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
  },
  arrowIcon: {
    width: 37,
    height: 37,
    opacity: 0.2,
  },
  functionIcon: {
    width: 70,
    height: 70,
  },
  btn: {
    width: "100%",
    height: "50%",
  },
});
