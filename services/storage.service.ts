import AsyncStorage from "@react-native-async-storage/async-storage";

type Key = "TOKEN_AUTH" | "ME";

export class StorageService {
  static async setItem(key: Key, value: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting item in AsyncStorage:", error);
      throw error;
    }
  }

  static async setItemString(key: Key, value: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error setting item in AsyncStorage:", error);
      throw error;
    }
  }
  static async getItem<T>(key: Key): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        return JSON.parse(value) as T;
      }
      return null;
    } catch (error) {
      console.error("Error getting item from AsyncStorage:", error);
      throw error;
    }
  }

  static async getItemString(key: Key): Promise<string | null> {
    try {
      const value = await AsyncStorage.getItem(key);

      return value;
    } catch (error) {
      console.error("Error getting item from AsyncStorage:", error);
      throw error;
    }
  }
  static async removeItem(key: Key): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from AsyncStorage:", error);
      throw error;
    }
  }

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
      throw error;
    }
  }
}
