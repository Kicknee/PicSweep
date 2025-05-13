import { useState, useEffect } from "react";
import { View, Pressable, StyleSheet, Alert, Linking } from "react-native";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import AsyncStorafe from "@react-native-async-storage/async-storage";
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

  const [sortedPhotos, setSortedPhotos] = useState<id[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

  const fetchLocalPhotos = async () => {
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

    const media = await MediaLibrary.getAssetsAsync({
      mediaType: "photo",
      first: 50,
    });

    const fetchedPhotos: Photo[] = media.assets.map((asset) => ({
      id: asset.id,
      uri: asset.uri,
    }));
    console.log(fetchedPhotos);
    setPhotos(fetchedPhotos);
  };

  useEffect(() => {
    fetchLocalPhotos();
  }, []);

  const compareWithSortedPhotos = () => {};

  const keepPhoto = (id: id) => {
    setSortedPhotos([...sortedPhotos, id]);
    storeIdData();
    showNextPhoto();
  };
  const showNextPhoto = () => {
    if (currentPhotoIndex + 1 < photos.length) {
      setCurrentPhotoIndex((prev) => prev + 1);
    } else {
      Alert.alert("Done", "No more photos to sweep!");
    }
  };

  const getIdData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("sortedPhotos");
      setSortedPhotos(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (error) {
      console.error(error);
    }
  };
  const storeIdData = async () => {
    try {
      const jsonValue = JSON.stringify(sortedPhotos);
      await AsyncStorage.setItem("sortedPhotos", jsonValue);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={style.imageContainer}>
      <View style={[style.iconsTaskbar, style.iconsTaskbarLeft]}>
        <Image style={[style.icon, style.arrowIcon]} source={LeftArrowBtn} />
        <Pressable style={style.btn} onPress={showNextPhoto}>
          <Image style={[style.icon, style.functionIcon]} source={CancelBtn} />
        </Pressable>
      </View>
      {photos?.length > 0 ? (
        <Image
          source={{ uri: photos[currentPhotoIndex].uri }}
          style={style.image}
        />
      ) : (
        <Image source={PlaceholderImage} style={style.image} />
      )}

      <View style={[style.iconsTaskbar, style.iconsTaskbarRight]}>
        <Image style={[style.icon, style.arrowIcon]} source={RightArrowBtn} />
        <Pressable
          style={style.btn}
          onPress={() => keepPhoto(photos[currentPhotoIndex].id)}
        >
          <Image style={[style.icon, style.functionIcon]} source={AcceptBtn} />
        </Pressable>
      </View>
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
