import React, {createRef, useEffect, useRef, useState} from 'react';
import {LetterTile} from './LetterTile';
import {View} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {useSelector} from 'react-redux';

export const Guess = props => {
  const wordLength = useSelector(state => state.wordLength);
  const currentGuessFilledIn = useSelector(state => state.currentGuessFilledIn);

  const inputRefs = useRef([
    ...Array(wordLength)
      .fill(null)
      .map(() => createRef()),
  ]);
  // useEffect(() => {
  //   inputRefs.current = inputRefs.current.slice(0, wordLength);
  // }, [wordLength]);

  const onReturnKeyPress = position => {
    if (!currentGuessFilledIn) {
      // console.log('inoutRefs:', inputRefs);
      inputRefs.current[(position + 1) % wordLength].focus();
    } else {
      props.onSubmitGuess();
    }
  };

  return (
    <View style={styleSheet.guess}>
      {[...Array(wordLength).keys()].map(i => {
        return (
          <LetterTile
            isActive={props.isActive}
            isAnnotated={props.isAnnotated}
            isFuture={props.isFuture}
            key={i.toString()}
            guessIndex={props.guessIndex}
            position={i}
            onReturnKeyPress={onReturnKeyPress}
            onTileFocus={props.onTileFocus}
            guessLetter={props.guess[i]}
            annotation={props.guessAnnotation[i]}
            ref={inputRefs}
          />
        );
      })}
    </View>
  );
};
