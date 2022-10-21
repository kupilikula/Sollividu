import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {currentGuessEdited} from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {TamilLetterUtils} from '../utils/TamilLetterUtils';
import Icon from 'react-native-vector-icons/Feather';
import {GuessLetterTileStates} from '../utils/annotateGuess';
import {constants} from '../utils/constants';
import {colorPalette} from '../styles/colorPalette';

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

    console.log('Letters:', tamilLetterUtils.Letters.flat());
    if (textInputValue === '') {
      inputLetter = '';
    } else if (tamilLetterUtils.Letters.flat().includes(textInputValue)) {
      console.log(
        'inside Letters includes true. textInputValue:',
        textInputValue
      );
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

  const onFocusTextInput = event => {
    console.log('inside LetterTile focus');
    if (!isFocussed) {
      console.log('inside !isFocussed condition. event:', event);
      setIsFocussed(true);
      props.onTileFocus(event.target);
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
          : props.isActive
          ? styleSheet.letterTileActive
          : props.isFuture
          ? styleSheet.letterTileFuture
          : {},
        isFocussed ? styleSheet.letterTileFocussed : {},
      ]}>
      {props.isAnnotated &&
        props.annotation.positionState.mei &&
        props.annotation.letterState !==
          GuessLetterTileStates.LETTER_MATCHED && (
          <Icon
            name="star"
            size={17}
            color={colorPalette.white}
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
            color={colorPalette.white}
            style={{position: 'absolute', top: 0, right: 0}}
          />
        )}
      <Text
        style={styleSheet.letterTileText(
          props.isAnnotated,
          useSmallerFontSize,
          useSmallestFontSize
        )}>
        {props.guessLetter}
      </Text>
      <TextInput
        style={[styleSheet.letterTileInput]}
        textAlign={'center'}
        selection={{
          start: props.guessLetter.length,
          end: props.guessLetter.length,
        }}
        onFocus={event => onFocusTextInput(event)}
        onBlur={() => {
          setIsFocussed(false);
        }}
        onChangeText={textInputValue => onLetterInput(textInputValue)}
        onSubmitEditing={handleSubmitGuess}
        value={props.guessLetter}
        editable={props.isActive && !wordGuessed}
        maxLength={2}
        caretHidden={true}
        autoCorrect={false}
        ref={letterInputRef}
      />
    </View>
  );
};
