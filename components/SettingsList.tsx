import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { resetHistory } from "@/utils/resetHistory";

export default function SettingsList() {
  type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

  const options: { name: IconName; text: string; onPress: () => void }[] = [
    { name: "history", text: "Reset photos", onPress: resetHistory },
  ];
  return (
    <FlatList
      data={options}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable onPress={item.onPress}>
          <View style={styles.btnContent}>
            <MaterialIcons name={item.name} color="#fff" size={28} />
            <Text style={styles.btnText}>{item.text}</Text>
          </View>
        </Pressable>
      )}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    height: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  btnContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginStart: 5,
  },
});
