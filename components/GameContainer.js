import React, {useRef} from 'react';
import {GuessList} from './GuessList';
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {useDispatch, useSelector} from 'react-redux';
import {addGuess, initializeNewGameState} from '../store/actions';
import {TamilLetterUtils} from '../utils/TamilLetterUtils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const tamilLetterUtils = TamilLetterUtils();

export const GameContainer = props => {
  const dispatch = useDispatch();
  const currentGuessLetters = useSelector(state => state.currentGuessLetters);

  const validateWord = letters => {
    return letters.every(
      l => l !== '' && tamilLetterUtils.Letters.flat().includes(l)
    );
  };

  const onSubmitGuess = () => {
    console.log('inside gamecontainer onsubmitGuess');
    if (validateWord(currentGuessLetters)) {
      dispatch(addGuess(currentGuessLetters));
    }
  };

  const onClear = () => {
    dispatch(
      initializeNewGameState({
        secretWord: null,
        numberOfGuesses: null,
      })
    );
  };
  const scrollViewRef = useRef(null);

  const onTileFocus = focusedTileRef => {
    console.log('inside onTileFocus:', focusedTileRef);
    focusedTileRef.current.measure(({x, y, w, h}) => {
      console.log('inside measure, y: ', y, 'h:', h);
      // scrollViewRef.current.scrollTo({y: y + h});
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styleSheet.gameContainer}
      ref={scrollViewRef}>
      <GuessList onSubmitGuess={onSubmitGuess} onTileFocus={onTileFocus} />
      <TouchableOpacity
        containerStyle={{overflow: 'visible'}}
        activeOpacity={0.8}
        style={styleSheet.button}
        onPress={onSubmitGuess}>
        <Text style={{color: 'white', margin: 10}}>Submit Word</Text>
      </TouchableOpacity>
      <Button title={'Clear Game'} onPress={onClear} />
      <View
        style={{
          minHeight: 400,
          backgroundColor: 'yellow',
          borderWidth: 2,
          width: '100%',
        }}
      />
    </ScrollView>
  );
};
