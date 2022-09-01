import React from 'react';
import {LetterTile} from './LetterTile';
import {View} from 'react-native';

export const Guess = props => {
  let wordLength = 6;
  return (
    <View style={{flexDirection: 'row'}}>
      {[...Array(wordLength).keys()].map(i => {
        return <LetterTile letter={props.guess.charAt(i)} key={i.toString()} />;
      })}
    </View>
  );
};
