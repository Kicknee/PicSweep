import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;
export default function Settings({ children, isVisible, onClose }: Props) {
  return (
    <Modal animationType="slide" visible={isVisible} transparent={true}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Settings</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" size={25} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "35%",
    width: "100%",
    backgroundColor: "#E67263",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
    backdropFilter: "",
  },
  titleContainer: {
    height: "20%",
    backgroundColor: "#f4f1f1",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    color: "#000",
    fontSize: 19,
    textAlign: "center",
  },
});
