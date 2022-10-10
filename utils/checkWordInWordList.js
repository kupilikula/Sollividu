import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkWordInWordList = async (word, wordLength) => {
  const wlKey = wordLength.toString() + 'LetterWords';
  const wordList = (await AsyncStorage.getItem(wlKey)).split('\n');
  return wordList.includes(word);
};
