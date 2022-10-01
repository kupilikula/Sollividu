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
import {TamilStringUtils} from '../utils/TamilStringUtils';
import DropDownPicker from 'react-native-dropdown-picker';
import {getNewRandomWord} from '../utils/getNewRandomWord';

const tamilLetterUtils = TamilLetterUtils();

export const GameContainer = props => {
  const dispatch = useDispatch();
  const currentGuessLetters = useSelector(state => state.currentGuessLetters);

  const [wordLength, setWordLength] = useState(6);
  const [wlDropDownOpen, setWlDropDownOpen] = useState(false);
  const [wlDropDownItems, setWlDropDownItems] = useState([
    {label: '3', value: 3},
    {label: '4', value: 4},
    {label: '5', value: 5},
    {label: '6', value: 6},
    {label: 'ஏதேனும்', value: -1},
  ]);

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
        secretWordLetters: null,
        numberOfGuesses: null,
      })
    );
  };
  const onNewGame = async () => {
    const newSecretWord = await getNewRandomWord(wordLength);
    console.log(
      'letters:',
      TamilStringUtils().splitIntoTamilLetters(newSecretWord)
    );
    dispatch(
      initializeNewGameState({
        secretWordLetters:
          TamilStringUtils().splitIntoTamilLetters(newSecretWord),
        numberOfGuesses: 8,
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

  return (
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
      <Button title={'New Game'} onPress={onNewGame} />
      <DropDownPicker
        open={wlDropDownOpen}
        value={wordLength}
        items={wlDropDownItems}
        setOpen={setWlDropDownOpen}
        setValue={setWordLength}
        setItems={setWlDropDownItems}
      />
      <View
        style={{
          minHeight: 800,
          backgroundColor: 'yellow',
          borderWidth: 2,
          width: '100%',
        }}
      />
    </View>
  );
};
