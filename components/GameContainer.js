import React from 'react';
import {GuessList} from './GuessList';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {useDispatch, useSelector} from 'react-redux';
import {addGuess, initializeNewGameState} from '../store/actions';
import {TamilLetterUtils} from '../utils/TamilLetterUtils';

const tamilLetterUtils = TamilLetterUtils();

export const GameContainer = props => {
  const dispatch = useDispatch();
  const currentGuessLetters = useSelector(state => state.currentGuessLetters);

  const validateWord = letters => {
    return letters.every(
      l => l !== '' && tamilLetterUtils.Letters.flat().includes(l)
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
      <GuessList onSubmitGuess={onSubmitGuess} />
      <TouchableOpacity
        containerStyle={{overflow: 'visible'}}
        activeOpacity={0.8}
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#5555ff',
          color: 'white',
          borderWidth: 0,
          borderRadius: 4,
          margin: 5,
          elevation: 10,
          shadowRadius: 1,
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.6,
          shadowColor: 'black',
          overflow: 'visible',
        }}
        onPress={onSubmitGuess}>
        <Text style={{color: 'white', margin: 10}}>Submit Word</Text>
      </TouchableOpacity>
      <Button title={'Clear Game'} onPress={onClear} />
    </View>
  );
};
