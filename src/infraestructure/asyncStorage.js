import AsyncStorage from "@react-native-async-storage/async-storage";

export const localStorageConst = {
  TOKEN: "token",
};

const saveKey = async (key, token) => {
  try {
    await AsyncStorage.setItem(key, token);
  } catch (error) {
    console.log(error);
  }
};

const getKey = async (key) => {
  try {
    const token = await AsyncStorage.getItem(key);
    return token;
  } catch (error) {
    console.log(error);
  }
};

const removeKey = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

export { saveKey, getKey, removeKey, clear };
