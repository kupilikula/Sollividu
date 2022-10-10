const RNFS = require('react-native-fs');
const {Platform} = require('react-native');
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadWordList = async wordLength => {
  let key = wordLength.toString() + 'LetterWords';
  let list = await AsyncStorage.getItem(key);
  console.log('inside loadWordList. before loading, list:', list);
  if (!list) {
    if (Platform.OS === 'ios') {
      console.log('calling readFile:');

      const path =
        `${RNFS.MainBundlePath}/tamillexicon_unique_words_of_length_` +
        wordLength.toString() +
        '.txt';
      RNFS.readFile(path).then(async result => {
        await AsyncStorage.setItem(
          wordLength.toString() + 'LetterWords',
          result
        );
      });
    } else if (Platform.OS === 'android') {
      RNFS.readFileAssets(
        'custom/tamillexicon_unique_words_of_length_' +
          wordLength.toString() +
          '.txt'
      ) // 'base64' for binary
        .then(async result => {
          await AsyncStorage.setItem(
            wordLength.toString() + 'LetterWords',
            result
          );
        })
        .catch(console.error);
    }
  }
  console.log('after loading');
};

module.exports = {loadWordList};
