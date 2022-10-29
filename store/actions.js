import {createAction} from '@reduxjs/toolkit';

const addGuess = createAction('guesses/addGuess');
const currentGuessEdited = createAction('guesses/currentGuessEdited');
const initializeNewGameState = createAction('game/initializeNewGameState');
const giveUpGame = createAction('game/giveUpGame');
export {addGuess, currentGuessEdited, initializeNewGameState, giveUpGame};
