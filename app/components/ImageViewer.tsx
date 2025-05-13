import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Photo {
  id: string;
  uri: string;
}

type id = string;

export default function ImageViewer() {
  const PlaceholderImage = require("@/assets/images/background-image.png");
  const LeftArrowBtn = require("@/assets/images/left-arrow.png");
  const RightArrowBtn = require("@/assets/images/right-arrow.png");
  const CancelBtn = require("@/assets/images/cancel.png");
  const AcceptBtn = require("@/assets/images/accept.png");

  const [reviewedPhotos, setReviewedPhotos] = useState<id[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    (async () => {
      //ask for permission to the local library
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Camera access required",
          "You need to manually enable camera access in the app settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]
        );
        return;
      }
      //load reviewed photos from the local storage
      const saved = await AsyncStorage.getItem("reviewedPhotos");
      const reviewedList = saved ? JSON.parse(saved) : [];
      setReviewedPhotos(reviewedList);

      //load photos from the library
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "photo",
      });

      //filter photos already reviewed
      const filtered = media.assets.filter(
        (asset) => !reviewedPhotos.includes(asset.id)
      );
      setPhotos(filtered);
      setCurrentIndex(0);
    })();
  });

  const currentImage = photos[currentIndex];

  const handleKeep = async () => {
    if (!currentImage) {
      Alert.alert("Congrats!", "No more photos to sweep!");
      return;
    }
    //add ID to the reviewedPhotos state and save in local storage
    const newList = [...reviewedPhotos, currentImage.id];
    setReviewedPhotos(newList);
    await AsyncStorage.setItem("reviewedPhotos", JSON.stringify(newList));
    //move to the next photo
    setCurrentIndex((prev) => prev + 1);
  };

  const handleDelete = async () => {
    if (!currentImage) {
      Alert.alert("Congrats!", "No more photos to sweep!");
      return;
    }
    //delete a photo from the library
    await MediaLibrary.deleteAssetsAsync(currentImage.id);
    //add ID to the reviewedPhotos state and save in local storage
    const newList = [...reviewedPhotos, currentImage.id];
    setReviewedPhotos(newList);
    await AsyncStorage.setItem("reviewedPhotos", JSON.stringify(newList));
    //move to the next photo
    setCurrentIndex((prev) => prev + 1);
  };
  return (
    <View style={style.imageContainer}>
      <View style={[style.iconsTaskbar, style.iconsTaskbarLeft]}>
        <Image style={[style.icon, style.arrowIcon]} source={LeftArrowBtn} />
        <Pressable style={style.btn} onPress={handleDelete}>
          <Image style={[style.icon, style.functionIcon]} source={CancelBtn} />
        </Pressable>
      </View>
      <Image
        source={currentImage ? { uri: currentImage.uri } : PlaceholderImage}
        style={style.image}
      />

      <View style={[style.iconsTaskbar, style.iconsTaskbarRight]}>
        <Image style={[style.icon, style.arrowIcon]} source={RightArrowBtn} />
        <Pressable style={style.btn} onPress={handleKeep}>
          <Image style={[style.icon, style.functionIcon]} source={AcceptBtn} />
        </Pressable>
      </View>
      {/* <View style={{ position: "fixed", bottom: 0, left: "-10%" }}>
        <Pressable
          onPress={() => {
            console.log("clear");
            AsyncStorage.clear();
          }}
        >
          <Text>Reset</Text>
        </Pressable>
      </View> */}
    </View>
  );
}

const style = StyleSheet.create({
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
