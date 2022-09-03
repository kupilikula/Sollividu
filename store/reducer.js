import {createReducer} from '@reduxjs/toolkit';
import {initialState} from './initialState';
import {addGuess, currentGuessEdited, initializeState} from './actions';
import {annotateGuess, GuessLetterTileStates} from '../utils/annotateGuess';

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(initializeState, (state, action) => {
      console.log('inside reducer:');
      return {
        ...state,
        guesses: [...Array(state.numberOfGuesses)].map(a =>
          [...Array(state.wordLength)].map(b => action.payload)
        ),
        guessAnnotations: [...Array(state.numberOfGuesses)].map(a =>
          [...Array(state.wordLength)].map(b => {
            return {
              letterState: GuessLetterTileStates.NOT_ANNOTATED,
              positionState: GuessLetterTileStates.NOT_ANNOTATED,
            };
          })
        ),
        currentGuessNumber: 0,
        currentGuessLetters: [...Array(state.wordLength)].map(
          a => action.payload
        ),
      };
    })
    .addCase(addGuess, (state, action) => {
      let wordGuessed =
        JSON.stringify(action.payload) === JSON.stringify(state.secretWord);
      let A = annotateGuess(action.payload, state.secretWord);
      console.log('A:', A);
      let S = {
        ...state,
        guesses: state.guesses.map((g, i) =>
          i === state.currentGuessNumber ? action.payload : [...g]
        ),
        guessAnnotations: state.guessAnnotations.map((a, i) =>
          i === state.currentGuessNumber ? [...A] : [...a]
        ),
        wordGuessed: wordGuessed,
        currentGuessNumber: wordGuessed
          ? state.currentGuessNumber
          : state.currentGuessNumber + 1,
        currentGuessLetters: wordGuessed
          ? state.currentGuessLetters
          : Array(state.wordLength).fill(''),
      };
      console.log('S:', S);
      return S;
    })
    .addCase(currentGuessEdited, (state, action) => {
      return {
        ...state,
        currentGuessLetters: state.currentGuessLetters.map((l, i) =>
          i === action.payload.position ? action.payload.letter : l
        ),
      };
    });
});
