import React, {useState} from 'react';
import {Guess} from './Guess';
import {FlatList, Text, View} from 'react-native';
import {keyExtractor} from 'react-native/Libraries/Lists/VirtualizeUtils';
import {styleSheet} from '../styles/styleSheet';
import {constants} from '../utils/constants';
import {useSelector} from 'react-redux';

export const GuessList = props => {
  const secretWord = useSelector(state => state.secretWord);
  const guesses = useSelector(state => state.guesses);
  const currentGuessNumber = useSelector(state => state.currentGuessNumber);
  console.log('guesses:', guesses);
  console.log('secretWord:', secretWord);
  return (
    <View style={styleSheet.guessList}>
      <FlatList
        data={guesses.map((g, i) => {
          return {
            index: i,
            guess: g,
            isActive: i === currentGuessNumber,
          };
        })}
        renderItem={({item}) => {
          console.log('item:', item);
          return (
            <Guess
              guess={item.guess}
              isActive={item.isActive}
              onSubmitGuess={props.onSubmitGuess}
            />
          );
        }}
      />
    </View>
  );
};
