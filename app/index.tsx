import { Text, View, StyleSheet, Image } from "react-native";

export default function Index() {
  const PlaceholderImage = require("@/assets/images/background-image.png");
  const LeftArrowBtn = require("@/assets/images/left-arrow.png");
  const RightArrowBtn = require("@/assets/images/right-arrow.png");
  const CancelBtn = require("@/assets/images/cancel.png");
  const AcceptBtn = require("@/assets/images/accept.png");
  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image source={PlaceholderImage} style={style.image} />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E67263",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "80%",
    position: "relative",
  },
  image: {
    width: "100%",
    borderRadius: 35,
    borderColor: "white",
    borderWidth: 14,
  },
});
