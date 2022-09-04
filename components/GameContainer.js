import React from 'react';
import {GuessList} from './GuessList';
import {Button, Text, View} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {useDispatch, useSelector} from 'react-redux';
import {addGuess, initializeNewGameState} from '../store/actions';
import {TamilStringUtils} from '../utils/TamilStringUtils';

const tamilStringUtils = TamilStringUtils();

export const GameContainer = props => {
  const dispatch = useDispatch();
  const currentGuessLetters = useSelector(state => state.currentGuessLetters);

  const validateWord = letters => {
    return letters.every(
      l => l !== '' && tamilStringUtils.Letters.flat().includes(l)
    );
  };

  const onSubmitGuess = () => {
    console.log('inside gamecontainer onsubmitGuess');
    if (validateWord(currentGuessLetters)) {
      dispatch(addGuess(currentGuessLetters));
    }
  };

  const onClear = () => {
    dispatch(
      initializeNewGameState({
        secretWord: null,
        numberOfGuesses: null,
      })
    );
  };

  return (
    <View style={styleSheet.gameContainer}>
      <Text>Top Area</Text>
      <GuessList onSubmitGuess={onSubmitGuess} />
      <Button title={'Submit Word'} onPress={onSubmitGuess} />
      <Button title={'Clear Game'} onPress={onClear} />
    </View>
  );
};
