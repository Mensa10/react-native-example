import { AsyncStorage } from 'react-native';

const storageKey: string = '@InstaClone:token';

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(storageKey, token);
  } catch (error) {
    console.log(error);
  }
} 

export const getStoreToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(storageKey);
    return token;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const clearStorage =  async () => {
  await AsyncStorage.clear();
}