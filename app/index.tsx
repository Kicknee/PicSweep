import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function Index() {
  const PlaceholderImage = require("@/assets/images/background-image.png");
  const LeftArrowBtn = require("@/assets/images/left-arrow.png");
  const RightArrowBtn = require("@/assets/images/right-arrow.png");
  const CancelBtn = require("@/assets/images/cancel.png");
  const AcceptBtn = require("@/assets/images/accept.png");

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
      <View style={style.imageContainer}>
        <View style={[style.iconsTaskbar, style.iconsTaskbarLeft]}>
          <Image style={[style.icon, style.arrowIcon]} source={LeftArrowBtn} />
          <Pressable style={style.btn}>
            <Image
              style={[style.icon, style.functionIcon]}
              source={CancelBtn}
            />
          </Pressable>
        </View>
        <Image source={PlaceholderImage} style={style.image} />
        <View style={[style.iconsTaskbar, style.iconsTaskbarRight]}>
          <Image style={[style.icon, style.arrowIcon]} source={RightArrowBtn} />
          <Pressable style={style.btn}>
            <Image
              style={[style.icon, style.functionIcon]}
              source={AcceptBtn}
            />
          </Pressable>
        </View>
      </View>
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
