import React, {useState} from 'react';
import {Guess} from './Guess';
import {FlatList, Text, View} from 'react-native';
import {keyExtractor} from 'react-native/Libraries/Lists/VirtualizeUtils';

export const GuessList = props => {
  let numberOfGuesses = 8;
  const [guesses, setGuesses] = useState(
    Array(numberOfGuesses)
      .fill('வாருக்காடை')
      .map((s, i) => {
        return {index: i, word: s};
      }),
  );
  console.log('guesses:', guesses);
  return (
    <View
      style={{
        height: 324,
        flexDirection: 'column',
        borderWidth: 2,
        // alignSelf: 'center',
        backgroundColor: 'yellow',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        data={guesses}
        renderItem={({item}) => {
          console.log('item:', item);
          return <Guess guess={item.word} />;
        }}
      />
    </View>
  );
};
