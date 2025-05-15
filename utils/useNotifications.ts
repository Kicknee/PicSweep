import * as Notifications from "expo-notifications";
import { useEffect } from "react";

export async function scheduleNotification(interval: "daily" | "weekly") {
  const trigger =
    interval === "daily"
      ? { hour: 10, minute: 0, repeats: true }
      : { weekday: 1, hour: 10, minute: 0, repeats: true }; // Weekly on Monday 10:00

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hey!",
      body: "How about sweeping 5 photos?",
    },
    trigger,
  });
}

export function useNotificationSetup() {
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission for notifications not granted!");
      }
    })();
  }, []);
}

export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
