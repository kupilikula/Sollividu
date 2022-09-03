import {createAction} from '@reduxjs/toolkit';

const addGuess = createAction('guesses/addGuess');
const initializeState = createAction('guesses/initializeState');
const currentGuessEdited = createAction('guesses/currentGuessEdited');
export {addGuess, initializeState, currentGuessEdited};
