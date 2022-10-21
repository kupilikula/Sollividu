import React, {useEffect, useRef, useState} from 'react';
import {GuessList} from './GuessList';
import {Dimensions, findNodeHandle, Text, UIManager, View} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {useDispatch, useSelector} from 'react-redux';
import {addGuess, initializeNewGameState} from '../store/actions';
import {TamilLetterUtils} from '../utils/TamilLetterUtils';
import {TamilStringUtils} from '../utils/TamilStringUtils';
import DropDownPicker from 'react-native-dropdown-picker';
import {getNewRandomWord} from '../utils/getNewRandomWord';
import {Button} from './Button';
import {checkWordInWordList} from '../utils/checkWordInWordList';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {constants} from '../utils/constants';
import {colorPalette} from '../styles/colorPalette';
import {useKeyboard} from '@react-native-community/hooks';

const tamilLetterUtils = TamilLetterUtils();

export const GameContainer = props => {
  const dispatch = useDispatch();
  const currentGuessLetters = useSelector(state => state.currentGuessLetters);
  const secretWordLetters = useSelector(state => state.secretWordLetters);
  const gameOver = useSelector(state => state.gameOver);
  const [wordLength, setWordLength] = useState(5);
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
    console.log('inside onNewGame');
    //TODO : There is a bug here probably in getNewRandomWord. It fails occasionally with an error 'cannot call split on undefined.'
    const newSecretWord = await getNewRandomWord(wordLength);
    console.log(
      'letters:',
      TamilStringUtils().splitIntoTamilLetters(newSecretWord)
    );
    dispatch(
      initializeNewGameState({
        secretWordLetters:
          TamilStringUtils().splitIntoTamilLetters(newSecretWord),
        numberOfGuesses: constants.numberOfGuesses,
      })
    );
  };
  const scrollViewRef = useRef(null);

  const scrollToInput = inputNode => {
    // Add a 'scroll' ref to your ScrollView
    console.log('scrollViewRef.current:', scrollViewRef.current);
    console.log('inputNode:', inputNode);
    let handle = findNodeHandle(inputNode);
    console.log('handle:', handle);
    let newPageY;
    UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      newPageY = pageY;
      console.log('measure:', x, y, width, height, pageX, pageY);
      console.log('newPageY', newPageY);
      console.log('screenHeight:', constants.screenHeight);

      if (newPageY > constants.screenHeight * 0.55) {
        console.log('inside condition for scroll');
        scrollViewRef.current.scrollTo({
          y: handle,
          animated: true,
        });
      }
    });
  };

  const onTileFocus = focusedInputNode => {
    console.log('inside onTileFocus:', focusedInputNode);
    scrollToInput(focusedInputNode);
  };

  useEffect(() => {
    const callOnNewGame = async () => {
      await onNewGame();
    };
    callOnNewGame().catch(console.error);
  }, []);

  return (
    <KeyboardAwareScrollView
      innerRef={val => {
        scrollViewRef.current = val;
      }}
      style={{backgroundColor: colorPalette.blue, height: 2000, flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      nestedScrollEnabled={true}
      enableOnAndroid={true}
      enableResetScrollToCoords={false}
      contentInsetAdjustmentBehavior="always"
      overScrollMode="always"
      showsVerticalScrollIndicator={false}
      bounces={false}
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      extraHeight={0}
      extraScrollHeight={0}>
      <View style={styleSheet.gameContainer}>
        <GuessList onSubmitGuess={onSubmitGuess} onTileFocus={onTileFocus} />
        {gameOver && (
          <View>
            <Text style={styleSheet.secretWord}>
              {secretWordLetters.join('')}
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button label="Submit Word" onPress={onSubmitGuess} />
          <Button label="Clear Game" onPress={onClear} />
          <Button label="New Game" onPress={onNewGame} />
        </View>
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
            listMode="SCROLLVIEW"
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
