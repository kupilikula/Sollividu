import React, {useState} from 'react';
import {Guess} from './Guess';
import {FlatList, ScrollView, SectionList, Text, View} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {useSelector} from 'react-redux';

export const GuessList = props => {
  const secretWordLetters = useSelector(state => state.secretWordLetters);
  const wordLength = useSelector(state => state.wordLength);
  const guesses = useSelector(state => state.guesses);
  const guessAnnotations = useSelector(state => state.guessAnnotations);
  const currentGuessNumber = useSelector(state => state.currentGuessNumber);
  const currentGuessLetters = useSelector(state => state.currentGuessLetters);
  console.log('guesses:', guesses);
  console.log('secretWordLetters:', secretWordLetters);

  let data = [...Array(currentGuessNumber + 1)].map((_, i) => {
    return {
      index: i,
      guess: i === currentGuessNumber ? currentGuessLetters : guesses[i],
      isActive: i === currentGuessNumber,
      isAnnotated: i < currentGuessNumber,
      guessAnnotation:
        i < currentGuessNumber
          ? guessAnnotations[i]
          : Array(wordLength).fill(null),
    };
  });

  return (
    <View style={{marginTop: 150}}>
      {data.map(item => {
        console.log('item:', item);
        return (
          <Guess
            key={item.index}
            guessIndex={item.index}
            guess={item.guess}
            isActive={item.isActive}
            isAnnotated={item.isAnnotated}
            onSubmitGuess={props.onSubmitGuess}
            onTileFocus={props.onTileFocus}
            guessAnnotation={item.guessAnnotation}
          />
        );
      })}
    </View>
  );
};
