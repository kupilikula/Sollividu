import {GuessLetterTileStates} from '../utils/annotateGuess';

export const newGameState = secretWordLetters => {
  let wordLength = secretWordLetters.length;
  return {
    wordLength: wordLength,
    secretWordLetters: secretWordLetters,
    guesses: [],
    guessAnnotations: [],
    currentGuessNumber: 0,
    currentGuessLetters: [...Array(wordLength)].fill(''),
    wordGuessed: false,
  };
};
