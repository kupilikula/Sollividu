import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {currentGuessEdited} from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {TamilLetterUtils} from '../utils/TamilLetterUtils';
import Icon from 'react-native-vector-icons/Feather';
import {GuessLetterTileStates} from '../utils/annotateGuess';
import {constants} from '../utils/constants';

const tamilLetterUtils = TamilLetterUtils();

export const LetterTile = props => {
  const dispatch = useDispatch();
  const [useSmallerFontSize, setUseSmallerFontSize] = useState(false);
  const [useSmallestFontSize, setUseSmallestFontSize] = useState(false);

  const wordGuessed = useSelector(state => state.wordGuessed);

  const onLetterInput = textInputValue => {
    let inputLetter;
    console.log(
      'textInputValue:',
      textInputValue,
      'length:',
      textInputValue.length
    );
    if (textInputValue.length > 2) {
      textInputValue = textInputValue.substring(0, 2);
      console.log('after trimming:', textInputValue);
    }

    if (textInputValue === '') {
      inputLetter = '';
    } else if (tamilLetterUtils.Letters.flat().includes(textInputValue)) {
      inputLetter = textInputValue;
    } else {
      inputLetter = null;
    }
    if (inputLetter !== null && props.guessLetter !== inputLetter) {
      dispatch(
        currentGuessEdited({position: props.position, letter: inputLetter})
      );
    }
  };

  const handleSubmitGuess = () => {
    props.onSubmitGuess();
  };

  const focusTextInput = () => {
    console.log('inside LetterTile focus');
    if (!isFocussed) {
      setIsFocussed(true);
      setTimeout(() => {
        // letterInputRef.current.blur();
        letterInputRef.current.focus();
      }, 10);
      // props.onTileFocus({
      //   guessIndex: props.guessIndex,
      //   position: props.position,
      // });
    }
  };

  useEffect(() => {
    console.log(
      'inside useeffect...',
      'props.position:',
      props.position,
      'props.guessLetter:',
      props.guessLetter
    );
    setUseSmallerFontSize(
      tamilLetterUtils.LongLetters.includes(props.guessLetter)
    );
    setUseSmallestFontSize(
      tamilLetterUtils.VeryLongLetters.includes(props.guessLetter)
    );

    console.log();
  }, [props.guessLetter]);

  const letterInputRef = useRef(null);
  const tileRef = useRef(null);
  const [isFocussed, setIsFocussed] = useState(false);

  return (
    <Pressable
      onPress={() => {
        console.log('onPress');
        focusTextInput();
      }}>
      <View
        ref={tileRef}
        onLayout={() => {
          console.log('inside onlayout of lettertile view');
        }}
        collapsable={false}
        style={[
          styleSheet.letterTile,
          props.isAnnotated
            ? styleSheet.letterTileAnnotated(props.annotation)
            : isFocussed
            ? styleSheet.letterTileFocussed
            : styleSheet.letterTileNotAnnotated,
        ]}>
        {props.isAnnotated &&
          props.annotation.positionState.mei &&
          props.annotation.letterState !==
            GuessLetterTileStates.LETTER_MATCHED && (
            <Icon
              name="star"
              size={17}
              color="#ffffff"
              style={{position: 'absolute', top: 1, right: 1}}
            />
          )}
        {props.isAnnotated &&
          props.annotation.positionState.uyir &&
          props.annotation.letterState !==
            GuessLetterTileStates.LETTER_MATCHED && (
            <Icon
              name="volume-1"
              size={20}
              color="#ffffff"
              style={{position: 'absolute', top: 0, right: 0}}
            />
          )}
        <Text
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            fontFamily: 'Noto Sans Tamil',
            fontWeight: '700',
            fontSize: useSmallestFontSize ? 13 : useSmallerFontSize ? 14 : 16,
            color: props.isAnnotated ? '#ffffff' : '#000000',
            position: 'absolute',
            // borderWidth: 1,
            // borderColor: 'green',
            // backgroundColor: 'green',
            // paddingBottom: 10,
            // paddingTop: 10,
            lineHeight: constants.letterTileSize,
          }}>
          {props.guessLetter}
        </Text>
        <TextInput
          style={[styleSheet.letterTileInput]}
          textAlign={'center'}
          selection={{
            start: props.guessLetter.length,
            end: props.guessLetter.length,
          }}
          onFocus={focusTextInput}
          onBlur={() => {
            setIsFocussed(false);
          }}
          onChangeText={textInputValue => onLetterInput(textInputValue)}
          onSubmitEditing={handleSubmitGuess}
          value={props.guessLetter}
          editable={props.isActive && !wordGuessed}
          maxLength={2}
          // caretHidden={true}
          autoCorrect={false}
          ref={letterInputRef}
        />
      </View>
    </Pressable>
  );
};
