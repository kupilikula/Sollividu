import {GuessLetterTileStates} from '../utils/annotateGuess';
import {TamilStringUtils} from '../utils/TamilStringUtils';

const tamilStringUtils = TamilStringUtils();

export const newGameState = (secretWord, numberOfGuesses) => {
  let secretWordLetters = tamilStringUtils.getTamilLetterArray(secretWord);
  let wordLength = secretWordLetters.length;
  return {
    wordLength: wordLength,
    numberOfGuesses: numberOfGuesses,
    secretWordLetters: secretWordLetters,
    guesses: [...Array(numberOfGuesses)].map(a =>
      [...Array(wordLength)].fill('')
    ),
    guessAnnotations: [...Array(numberOfGuesses)].map(a =>
      [...Array(wordLength)].map(b => {
        return {
          letterState: GuessLetterTileStates.NOT_ANNOTATED,
          positionState: {uyir: null, mei: null},
        };
      })
    ),
    currentGuessNumber: 0,
    currentGuessLetters: [...Array(wordLength)].fill(''),
    wordGuessed: false,
  };
};
