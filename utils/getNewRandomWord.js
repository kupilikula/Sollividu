import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadWordList} from './loadWordList';

export const getNewRandomWord = async wordLength => {
  const wl =
    wordLength === -1
      ? [3, 4, 5, 6][Math.floor(Math.random() * 4)]
      : wordLength;
  const wlKey = wl.toString() + 'LetterWords';
  await loadWordList(wl);
  const wordList = (await AsyncStorage.getItem(wlKey)).split('\n');
  console.log('wordList.length:', wordList.length);
  const newRandomIndex = Math.floor(Math.random() * wordList.length);
  console.log('wordList:', wordList);
  const newRandomWord = wordList[newRandomIndex];
  console.log('newRandomIndex:', newRandomIndex);
  console.log('newRandomWord:', newRandomWord);
  return newRandomWord;
};
