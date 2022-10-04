import {createReducer} from '@reduxjs/toolkit';
import {addGuess, currentGuessEdited, initializeNewGameState} from './actions';
import {annotateGuess} from '../utils/annotateGuess';
import {newGameState} from './newGameState';

export const reducer = currentGameState =>
  createReducer(currentGameState, builder => {
    builder
      .addCase(initializeNewGameState, (state, action) => {
        let s = action.payload.secretWordLetters
          ? action.payload.secretWordLetters
          : state.secretWordLetters;
        return newGameState(s);
      })
      .addCase(addGuess, (state, action) => {
        let wordGuessed =
          JSON.stringify(action.payload) ===
          JSON.stringify(state.secretWordLetters);
        let A = annotateGuess(action.payload, state.secretWordLetters);
        console.log('A:', A);
        let S = {
          ...state,
          guesses: state.guesses.concat([action.payload]),
          guessAnnotations: state.guessAnnotations.concat([[...A]]),
          wordGuessed: wordGuessed,
          currentGuessNumber: state.currentGuessNumber + 1,
          currentGuessLetters: Array(state.wordLength).fill(''),
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
