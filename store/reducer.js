import {createAction, createReducer} from '@reduxjs/toolkit';
import {initialState} from './initialState';
import {addGuess, currentGuessEdited, initializeGuesses} from './actions';

export const reducer = createReducer(initialState, builder => {
  builder
    .addCase(initializeGuesses, (state, action) => {
      console.log('inside reducer:');
      state.guesses = Array(state.numberOfGuesses).fill(
        Array(state.wordLength).fill(action.payload),
      );
      state.currentGuessNumber = 0;
      state.currentGuessLetters = Array(state.wordLength).fill(action.payload);
    })
    .addCase(addGuess, (state, action) => {
      state.guesses[state.currentGuessNumber] = action.payload;
      state.currentGuessNumber += 1;
      state.currentGuessLetters = Array(state.wordLength).fill('');
    })
    .addCase(currentGuessEdited, (state, action) => {
      state.currentGuessLetters[action.payload.position] =
        action.payload.letter;
    });
});
