import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const REMINDER_KEY = "user_reminder_preference";

export type ReminderType = "daily" | "weekly" | "none";

// 📲 Konfiguracja kanału (Android)
async function configureNotificationChannel() {
  await Notifications.setNotificationChannelAsync("default", {
    name: "Default",
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
  });
}

export async function scheduleNotification(interval: "daily" | "weekly") {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    console.warn("Notification permissions not granted");
    return;
  }

  await configureNotificationChannel();

  let trigger: Notifications.NotificationTriggerInput;

  // if (interval === "daily") {
  //   trigger = {
  //     type: "calendar",
  //     hour: 19,
  //     minute: 0,
  //     repeats: true,
  //   };
  // } else {
  //   trigger = {
  //     type: "calendar",
  //     weekday: 2, // poniedziałek
  //     hour: 19,
  //     minute: 0,
  //     repeats: true,
  //   };
  // }
  if (interval === "daily") {
    trigger = { type: "timeInterval", seconds: 30, repeats: true };
  } else {
    trigger = { type: "timeInterval", minute: 1, repeats: true };
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hey!",
      body: "How about sweeping 5 photos?",
      sound: "default",
    },
    trigger,
  });

  console.log("Scheduled notification:", trigger);

  // show all scheduled notifications
  const all = await Notifications.getAllScheduledNotificationsAsync();
  console.log("All scheduled notifications:", all);
}

export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
  console.log("All notifications cancelled.");
}

export function useNotificationSetup() {
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        await configureNotificationChannel();
      } else {
        console.warn("Notification permissions not granted");
      }
    })();
  }, []);
}

//Save user choice
export async function saveReminderSetting(type: ReminderType) {
  try {
    await AsyncStorage.setItem(REMINDER_KEY, type);
    console.log("Saved reminder setting:", type);
  } catch (error) {
    console.error("Failed to save reminder setting", error);
  }
}

// Read user choice
export async function loadReminderSetting(): Promise<ReminderType | null> {
  try {
    const value = await AsyncStorage.getItem(REMINDER_KEY);
    if (value === "daily" || value === "weekly" || value === "none") {
      console.log("Loaded reminder setting:", value);
      return value;
    }
    return null;
  } catch (error) {
    console.error(" Failed to load reminder setting", error);
    return null;
  }
}
