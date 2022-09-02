import React, {useState, useEffect, useContext} from 'react';
import {GuessList} from './GuessList';
import {Text, View, StyleSheet, Button} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {useDispatch, useSelector} from 'react-redux';
import {addGuess} from '../store/actions';
import {Letters} from '../utils/tamilLetters';

export const GameContainer = props => {
  const dispatch = useDispatch();
  const currentGuessLetters = useSelector(state => state.currentGuessLetters);

  const validateWord = letters => {
    return letters.every(l => l !== '' && Letters.flat().includes(l));
  };

  const onSubmitGuess = () => {
    console.log('inside gamecontainer onsubmitGuess');
    if (validateWord(currentGuessLetters)) {
      dispatch(addGuess(currentGuessLetters));
    }
  };

  return (
    <View style={styleSheet.gameContainer}>
      <Text>Top Area</Text>
      <GuessList onSubmitGuess={onSubmitGuess} />
      <Button title={'Submit Word'} onPress={onSubmitGuess} />
    </View>
  );
};
