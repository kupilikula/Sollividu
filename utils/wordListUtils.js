const RNFS = require('react-native-fs');
const {Platform} = require('react-native');
import {MMKV} from 'react-native-mmkv';

const mmkvStore = new MMKV();

const loadWordList = async wordLength => {
  let key = wordLength.toString() + 'LetterWords';
  if (!mmkvStore.contains(key)) {
    if (Platform.OS === 'ios') {
      console.log('calling readFile:');

      const path =
        `${RNFS.MainBundlePath}/tamillexicon_unique_words_of_length_` +
        wordLength.toString() +
        '.txt';
      await RNFS.readFile(path).then(result => {
        mmkvStore.set(key, result);
      });
    } else if (Platform.OS === 'android') {
      await RNFS.readFileAssets(
        'custom/tamillexicon_unique_words_of_length_' +
          wordLength.toString() +
          '.txt'
      ) // 'base64' for binary
        .then(result => {
          mmkvStore.set(key, result);
        })
        .catch(console.error);
    }
  }
  console.log('after loading: item:', mmkvStore.getString(key));
};

const getNewRandomWord = async wordLength => {
  const wl =
    wordLength === -1
      ? [3, 4, 5, 6][Math.floor(Math.random() * 4)]
      : wordLength;
  const wlKey = wl.toString() + 'LetterWords';
  await loadWordList(wl);
  const wordList = mmkvStore.getString(wlKey).split('\n');
  console.log('wordList.length:', wordList.length);
  const newRandomIndex = Math.floor(Math.random() * wordList.length);
  // console.log('wordList:', wordList);
  const newRandomWord = wordList[newRandomIndex];
  console.log('newRandomIndex:', newRandomIndex);
  console.log('newRandomWord:', newRandomWord);
  return newRandomWord;
};

const checkWordInWordList = (word, wordLength) => {
  const wlKey = wordLength.toString() + 'LetterWords';
  const wordList = mmkvStore.getString(wlKey).split('\n');
  return wordList.includes(word);
};

module.exports = {loadWordList, getNewRandomWord, checkWordInWordList};
