import React, {useState, useEffect, useContext} from 'react';
import {GuessList} from './GuessList';
import {Text, View, StyleSheet} from 'react-native';

export const GameContainer = props => {
  const [word, setWord] = useState('abcdef');
  return (
    <View style={styles.gameContainer}>
      <Text>Top Area</Text>
      <GuessList />
      <Text>Bottom Area</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flexDirection: 'column',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginTop: '10%',
    width: '80%',
    // marginBottom: '10%',
  },
});
