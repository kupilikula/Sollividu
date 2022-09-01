import {createAction} from '@reduxjs/toolkit';

const addGuess = createAction('guesses/addGuess');
const initializeGuesses = createAction('guesses/initializeGuesses');
const currentGuessEdited = createAction('guesses/currentGuessEdited');
export {addGuess, initializeGuesses, currentGuessEdited};
