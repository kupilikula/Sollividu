import React, {useState, useEffect, useContext} from 'react';
import {GuessList} from './GuessList';
import {Text, View, StyleSheet, Button} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {useDispatch, useSelector} from 'react-redux';
import {addGuess} from '../store/actions';

export const GameContainer = props => {
  const dispatch = useDispatch();
  const currentGuessLetters = useSelector(state => state.currentGuessLetters);
  const submitWord = () => {
    dispatch(addGuess(currentGuessLetters));
  };

  return (
    <View style={styleSheet.gameContainer}>
      <Text>Top Area</Text>
      <GuessList />
      <Button title={'Submit Word'} onPress={submitWord} />
    </View>
  );
};
