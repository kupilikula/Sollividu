import React from 'react';
import {Text, View} from 'react-native';
export const LetterTile = props => {
  return (
    <View
      style={{
        height: 40,
        width: 40,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>{props.letter}</Text>
    </View>
  );
};
