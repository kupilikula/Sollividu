import React, {useState} from 'react';
import {Guess} from './Guess';
import {FlatList, Text, View} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {useSelector} from 'react-redux';

export const GuessList = props => {
  const secretWordLetters = useSelector(state => state.secretWordLetters);
  const guesses = useSelector(state => state.guesses);
  const guessAnnotations = useSelector(state => state.guessAnnotations);
  const currentGuessNumber = useSelector(state => state.currentGuessNumber);
  const currentGuessLetters = useSelector(state => state.currentGuessLetters);
  console.log('guesses:', guesses);
  console.log('secretWordLetters:', secretWordLetters);
  return (
    // <View style={styleSheet.guessList}>
    <FlatList
      data={guesses.map((g, i) => {
        return {
          index: i,
          guess: i === currentGuessNumber ? currentGuessLetters : g,
          isActive: i === currentGuessNumber,
          isAnnotated: i < currentGuessNumber,
          guessAnnotation: guessAnnotations[i],
        };
      })}
      renderItem={({item}) => {
        console.log('item:', item);
        return (
          <Guess
            guess={item.guess}
            isActive={item.isActive}
            isAnnotated={item.isAnnotated}
            onSubmitGuess={props.onSubmitGuess}
            guessAnnotation={item.guessAnnotation}
          />
        );
      }}
    />
    // </View>
  );
};
