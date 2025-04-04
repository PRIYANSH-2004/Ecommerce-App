import AsyncStorage from "@react-native-async-storage/async-storage";

const AsyncStorageHelper = {
  async addItem(key, item) {
    const existingItems = JSON.parse(await AsyncStorage.getItem(key)) || [];
    existingItems.push(item);
    await AsyncStorage.setItem(key, JSON.stringify(existingItems));
  },

  async getItems(key) {
    const items = await AsyncStorage.getItem(key);
    return JSON.parse(items) || [];
  },
};

export default AsyncStorageHelper;
