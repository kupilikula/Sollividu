import {createAction} from '@reduxjs/toolkit';

const addGuess = createAction('guesses/addGuess');
const currentGuessEdited = createAction('guesses/currentGuessEdited');
const initializeNewGameState = createAction('game/initializeNewGameState');
const focusYChanged = createAction('game/focusYChanged');
export {addGuess, currentGuessEdited, initializeNewGameState, focusYChanged};
