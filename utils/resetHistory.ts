import AsyncStorage from "@react-native-async-storage/async-storage";
import { reloadAppAsync } from "expo";

export function resetHistory() {
  AsyncStorage.clear();
  reloadAppAsync();
}
