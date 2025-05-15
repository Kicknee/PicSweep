import React, { PropsWithChildren, useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function SettingsModal({ children, isVisible, onClose }: Props) {
  const [reminder, setReminder] = useState<"daily" | "weekly" | null>(null);

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Settings</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reminders</Text>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setReminder("daily")}
            >
              <View style={styles.radioCircle}>
                {reminder === "daily" && <View style={styles.radioSelected} />}
              </View>
              <Text style={styles.optionText}>Daily</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setReminder("weekly")}
            >
              <View style={styles.radioCircle}>
                {reminder === "weekly" && <View style={styles.radioSelected} />}
              </View>
              <Text style={styles.optionText}>Weekly</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>{children}</View>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#3B252C",
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    color: "#F9F6F6",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#FF785A",
    marginBottom: 12,
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "#5A3A40",
    paddingTop: 20,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFF",
  },
  optionText: {
    color: "#FFF",
    fontSize: 16,
  },
  feedbackText: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: "#5A3A40",
    paddingVertical: 12,
    borderRadius: 18,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
