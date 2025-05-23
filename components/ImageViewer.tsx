import { useState, useEffect } from "react";
import { View, Pressable, StyleSheet, Alert, Linking } from "react-native";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

interface Photo {
  id: string;
  uri: string;
}

type id = string;

const SWIPE_THRESHOLD = 180;

export default function ImageViewer() {
  const PlaceholderImage = require("@/assets/images/background-image.png");
  const LeftArrowBtn = require("@/assets/images/left-arrow.png");
  const RightArrowBtn = require("@/assets/images/right-arrow.png");
  const CancelBtn = require("@/assets/images/cancel.png");
  const AcceptBtn = require("@/assets/images/accept.png");

  const [reviewedPhotos, setReviewedPhotos] = useState<id[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Library access required",
          "You need to manually enable library access in the app settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]
        );
        return;
      }

      const saved = await AsyncStorage.getItem("reviewedPhotos");
      const reviewedList = saved ? JSON.parse(saved) : [];
      setReviewedPhotos(reviewedList);

      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "photo",
      });

      const filtered = media.assets.filter(
        (asset) => !reviewedList.includes(asset.id)
      );
      setPhotos(filtered);
      setCurrentIndex(0);
    })();
  }, []);

  const currentImage = photos[currentIndex];

  const drag = Gesture.Pan()
    .onStart(() => {
      opacity.value = 0;
    })
    .onChange((event) => {
      translateX.value += event.changeX;
    })
    .onEnd((event) => {
      if (event.translationX >= SWIPE_THRESHOLD) {
        runOnJS(handleKeep)();
      } else if (event.translationX <= -SWIPE_THRESHOLD) {
        runOnJS(handleDelete)();
      } else {
        translateX.value = 0;
        opacity.value = 1;
      }
    });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const iconsStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(opacity.value),
    };
  });

  async function handleKeep() {
    if (!currentImage) {
      Alert.alert("Congrats!", "No more photos to sweep!");
      return;
    }
    const newList = [...reviewedPhotos, currentImage.id];
    setReviewedPhotos(newList);
    await AsyncStorage.setItem("reviewedPhotos", JSON.stringify(newList));
    nextImage();
  }

  async function handleDelete() {
    if (!currentImage) {
      Alert.alert("Congrats!", "No more photos to sweep!");
      return;
    }

    try {
      const assetId = currentImage.id;
      await MediaLibrary.deleteAssetsAsync([assetId]);
    } catch (error) {
      console.error("Error deleting asset:", error);
      Alert.alert(
        "Could not delete photo",
        "This photo cannot be deleted. It may be protected or cloud-based."
      );
      const newList = [...reviewedPhotos, currentImage.id];
      setReviewedPhotos(newList);
      await AsyncStorage.setItem("reviewedPhotos", JSON.stringify(newList));
      nextImage();
      return;
    }

    const newList = [...reviewedPhotos, currentImage.id];
    setReviewedPhotos(newList);
    await AsyncStorage.setItem("reviewedPhotos", JSON.stringify(newList));
    nextImage();
  }

  function nextImage() {
    translateX.value = 0;
    opacity.value = 1;
    setCurrentIndex((prev) => prev + 1);
  }

  return (
    <View style={style.viewerContainer}>
      <Animated.View
        style={[style.iconsTaskbar, style.iconsTaskbarLeft, iconsStyle]}
      >
        <Image style={[style.icon, style.arrowIcon]} source={LeftArrowBtn} />
        <Pressable style={style.btn} onPress={handleDelete}>
          <Image style={[style.icon, style.functionIcon]} source={CancelBtn} />
        </Pressable>
      </Animated.View>

      <GestureDetector gesture={drag}>
        <Animated.View style={[style.imageContainer, containerStyle]}>
          <Image
            source={currentImage ? { uri: currentImage.uri } : PlaceholderImage}
            style={style.image}
          />
        </Animated.View>
      </GestureDetector>

      <Animated.View
        style={[style.iconsTaskbar, style.iconsTaskbarRight, iconsStyle]}
      >
        <Image style={[style.icon, style.arrowIcon]} source={RightArrowBtn} />
        <Pressable style={style.btn} onPress={handleKeep}>
          <Image style={[style.icon, style.functionIcon]} source={AcceptBtn} />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const style = StyleSheet.create({
  viewerContainer: {
    width: "70%",
    height: "60%",
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    transform: "rotate(6deg)",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    boxShadow: "5px 5px 25px black",
    borderRadius: 35,
    borderColor: "white",
    borderWidth: 14,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
