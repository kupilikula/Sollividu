import React, {useEffect, useRef, useState} from 'react';
import {GuessList} from './GuessList';
import {
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
import {Button} from './Button';
import {checkWordInWordList} from '../utils/checkWordInWordList';
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
    {label: '*', value: -1},
  ]);

  const validateWord = async letters => {
    let letterCheck = letters.every(
      l => l !== '' && tamilLetterUtils.Letters.flat().includes(l)
    );

    if (letterCheck) {
      let wordCheck = await checkWordInWordList(
        letters.join(''),
        letters.length
      );
      return wordCheck;
    } else {
      return false;
    }
  };

  const onSubmitGuess = async () => {
    console.log('inside gamecontainer onsubmitGuess');
    let check = await validateWord(currentGuessLetters);
    console.log('validateWord:', check);
    if (check) {
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
      <Button label="Submit Word" onPress={onSubmitGuess} />
      <Button label="Clear Game" onPress={onClear} />
      <Button label="New Game" onPress={onNewGame} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontFamily: 'Noto Sans Tamil',
            fontWeight: '500',
            marginRight: 10,
          }}>
          எழுத்துக்கள்:
        </Text>
        <DropDownPicker
          open={wlDropDownOpen}
          value={wordLength}
          items={wlDropDownItems}
          setOpen={setWlDropDownOpen}
          setValue={setWordLength}
          setItems={setWlDropDownItems}
          containerStyle={{
            width: 60,
          }}
        />
      </View>
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
