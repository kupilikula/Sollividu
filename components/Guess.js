import React from 'react';
import {LetterTile} from './LetterTile';
import {View} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {useSelector} from 'react-redux';

export const Guess = props => {
  const wordLength = useSelector(state => state.wordLength);

  return (
    <View style={styleSheet.guess}>
      {[...Array(wordLength).keys()].map(i => {
        return (
          <LetterTile
            isActive={props.isActive}
            isAnnotated={props.isAnnotated}
            key={i.toString()}
            position={i}
            onSubmitGuess={props.onSubmitGuess}
            onTileFocus={props.onTileFocus}
            guessLetter={props.guess[i]}
            annotation={props.guessAnnotation[i]}
          />
        );
      })}
    </View>
  );
};
