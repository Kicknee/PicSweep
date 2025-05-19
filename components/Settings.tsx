import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  scheduleNotification,
  cancelAllNotifications,
  useNotificationSetup,
  saveReminderSetting,
  loadReminderSetting,
} from "@/utils/useNotifications";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

type ReminderType = "daily" | "weekly" | "none" | null;

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function SettingsModal({ children, isVisible, onClose }: Props) {
  const [reminder, setReminder] = useState<ReminderType>(null);

  useNotificationSetup();

  useEffect(() => {
    const fetchReminder = async () => {
      const saved = await loadReminderSetting();
      if (saved) {
        setReminder(saved);
      }
    };

    if (isVisible) {
      fetchReminder();
    }
  }, [isVisible]);

  const handleReminderSelection = (type: "daily" | "weekly" | "none") => {
    setReminder(type);
    saveReminderSetting(type);
    cancelAllNotifications();

    if (type !== "none") {
      scheduleNotification(type);
    }
  };

  return (
    <View style={styles.modalBackground}>
      <Modal visible={isVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <Pressable
            style={{ ...StyleSheet.absoluteFillObject }}
            onPress={onClose}
          ></Pressable>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Settings</Text>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Reminders</Text>

              <Pressable
                style={styles.radioOption}
                onPress={() => handleReminderSelection("daily")}
              >
                <View style={styles.radioCircle}>
                  {reminder === "daily" && (
                    <View style={styles.radioSelected} />
                  )}
                </View>
                <Text style={styles.optionText}>Daily</Text>
              </Pressable>

              <Pressable
                style={styles.radioOption}
                onPress={() => handleReminderSelection("weekly")}
              >
                <View style={styles.radioCircle}>
                  {reminder === "weekly" && (
                    <View style={styles.radioSelected} />
                  )}
                </View>
                <Text style={styles.optionText}>Weekly</Text>
              </Pressable>

              <Pressable
                style={styles.radioOption}
                onPress={() => handleReminderSelection("none")}
              >
                <View style={styles.radioCircle}>
                  {reminder === "none" && <View style={styles.radioSelected} />}
                </View>
                <Text style={styles.optionText}>Disable</Text>
              </Pressable>
            </View>

            <View style={styles.section}>{children}</View>

            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
