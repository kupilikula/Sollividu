import {GuessLetterTileStates} from '../utils/annotateGuess';

export const newGameState = (secretWordLetters, numberOfGuesses) => {
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
    currentGuessFilledIn: false,
    wordGuessed: false,
    gameOver: false,
  };
};
