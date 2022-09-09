import React, {useEffect, useRef, useState} from 'react';
import {GuessList} from './GuessList';
import {
  Button,
  Dimensions,
  Keyboard,
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
import {useKeyboard} from '@react-native-community/hooks';

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
  // const keyboard = useKeyboard();
  const windowHeight = Dimensions.get('window').height;

  const onTileFocus = focusedTile => {
    console.log('inside onTileFocus:', focusedTile);
    let tileBottom = (focusedTile.guessIndex + 1) * 62 + 150;
    // if (tileBottom > windowHeight - keyboard.keyboardHeight) {
    //   scrollViewRef.current.scrollTo({
    //     y: tileBottom - windowHeight + keyboard.keyboardHeight,
    //   });
    // }
  };

  // const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  //
  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
  //     console.log('inside keyboarddidshow');
  //     setKeyboardStatus('Keyboard Shown');
  //   });
  //   const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
  //     console.log('inside keyboarddidhide');
  //     setKeyboardStatus('Keyboard Hidden');
  //   });
  //
  //   return () => {
  //     showSubscription.remove();
  //     hideSubscription.remove();
  //   };
  // }, []);

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      enabled={true}
      keyboardVerticalOffset={160}>
      {/*<ScrollView ref={scrollViewRef}>*/}
      <View style={styleSheet.gameContainer}>
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
      </View>
      {/*</ScrollView>*/}
    </KeyboardAvoidingView>
  );
};
