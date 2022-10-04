import React, {useRef, useState} from 'react';
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
    console.log('inside onNewGame');
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
  const [currentPageY, setCurrentPageY] = useState(0);
  const scrollViewRef = useRef(null);
  const screenHeight = Dimensions.get('screen').height;

  const scrollToInput = inputNode => {
    // Add a 'scroll' ref to your ScrollView
    console.log('scrollViewRef.current:', scrollViewRef);
    console.log('inputNode:', inputNode);
    let handle = findNodeHandle(inputNode);
    console.log('handle:', handle);
    let newPageY;
    UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      newPageY = pageY;
      console.log('measure:', x, y, width, height, pageX, pageY);
      console.log('newPageY', newPageY);
      console.log('currentPageY:', currentPageY);
      // console.log('scrollPosition before:', scrollPosition);
      console.log('screenHeight:', screenHeight);
      console.log('headerHeight:', props.headerHeight);
      if (
        Math.abs(newPageY - currentPageY) > 10 &&
        (newPageY < props.headerHeight * 1.2 || newPageY > screenHeight * 0.5)
      ) {
        scrollViewRef.current.scrollTo({
          y: handle,
          animated: true,
        });
      }
    });
  };

  const focusedInput = useRef(null);

  const onTileFocus = focusedInputNode => {
    console.log('inside onTileFocus:', focusedInputNode);
    focusedInput.current = focusedInputNode;
    scrollToInput(focusedInputNode);
  };

  const updateFocusedPageY = handle =>
    UIManager.measure(handle, (x1, y1, w, h, pX, pY) => setCurrentPageY(pY));

  return (
    <KeyboardAwareScrollView
      innerRef={val => {
        scrollViewRef.current = val;
      }}
      style={{backgroundColor: 'red', flex: 1, height: 1500}}
      contentContainerStyle={{flexGrow: 1}}
      nestedScrollEnabled={true}
      enableOnAndroid={true}
      enableResetScrollToCoords={false}
      contentInsetAdjustmentBehavior="always"
      overScrollMode="always"
      showsVerticalScrollIndicator={true}
      bounces={false}
      extraHeight={0}
      extraScrollHeight={0}>
      <View style={styleSheet.gameContainer}>
        <GuessList onSubmitGuess={onSubmitGuess} onTileFocus={onTileFocus} />
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
        <View
          style={{
            minHeight: 800,
            backgroundColor: 'yellow',
            borderWidth: 2,
            width: '100%',
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
