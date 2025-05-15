import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { resetHistory } from "@/utils/resetHistory";

export default function SettingsList() {
  type IconName = React.ComponentProps<typeof MaterialIcons>["name"];

  const options: { name: IconName; text: string; onPress: () => void }[] = [
    { name: "history", text: "Reset photos", onPress: resetHistory },
    {
      name: "report",
      text: "Report",
      onPress: () => {
        return;
      },
    },
  ];
  return (
    <FlatList
      data={options}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable onPress={item.onPress}>
          <View style={styles.btnContent}>
            <MaterialIcons name={item.name} color="#fff" size={25} />
            <Text style={styles.btnText}>{item.text}</Text>
          </View>
        </Pressable>
      )}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  btnContent: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnText: {
    flex: 1,
    color: "white",
    fontSize: 16,
    marginStart: 5,
  },
});
