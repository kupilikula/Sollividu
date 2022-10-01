const RNFS = require('react-native-fs');
const {Platform, AsyncStorage} = require('react-native');

const loadWordList = async wordLength => {
  if (Platform.OS === 'ios') {
    console.log('calling readFile:');
    const path =
      `${RNFS.MainBundlePath}/tamillexicon_unique_words_of_length_` +
      wordLength.toString() +
      '.txt';
    RNFS.readFile(path).then(async result => {
      await AsyncStorage.setItem(wordLength.toString() + 'LetterWords', result);
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
};

module.exports = {loadWordList};
