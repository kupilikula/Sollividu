import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {Letters} from '../utils/tamilLetters.js';
import '../utils/TamilStringUtils';
import {currentGuessEdited} from '../store/actions';
import {useDispatch} from 'react-redux';
import {TamilStringUtils} from '../utils/TamilStringUtils';

export const LetterTile = props => {
  const [inputLetter, setInputLetter] = useState('');
  const dispatch = useDispatch();

  const validateLetter = l => {
    return l === '' || Letters.flat().includes(l);
  };

  const onLetterInput = textInputValue => {
    if (textInputValue.length > 2) {
      textInputValue = textInputValue.substring(0, 2);
    }

    if (textInputValue === '') {
      setInputLetter('');
    } else if (TamilStringUtils.getTamilWordLength(textInputValue) === 1) {
      let f = TamilStringUtils.getTamilLetterAt(textInputValue, 0);
      if (validateLetter(f)) {
        setInputLetter(f);
      } else {
        setInputLetter('');
      }
    }
  };

  const handleSubmitGuess = () => {
    props.onSubmitGuess();
  };

  const focusTextInput = () => {
    letterInputRef.current.focus();
  };

  useEffect(() => {
    dispatch(
      currentGuessEdited({position: props.position, letter: inputLetter})
    );
    console.log(
      'props.position:',
      props.position,
      'props.guessLetter:',
      props.guessLetter
    );
  }, [inputLetter]);

  // const applyLetterTileStyles = () {
  //
  // }
  const annotationToNumber = {
    LETTER_NOT_FOUND: 0,
    LETTER_MATCHED: 1,
    LETTER_ELSEWHERE: 2,
    NOT_ANNOTATED: 'x',
  };
  const letterInputRef = useRef(null);
  return (
    <Pressable onPress={focusTextInput}>
      <View
        style={[
          styleSheet.letterTile,
          props.isActive
            ? styleSheet.letterTileActive
            : styleSheet.letterTileInactive,
        ]}>
        <TextInput
          style={styleSheet.letterTileInput}
          onChangeText={textInputValue => onLetterInput(textInputValue)}
          onSubmitEditing={handleSubmitGuess}
          value={inputLetter}
          editable={props.isActive}
          maxLength={2}
          caretHidden={true}
          autoCorrect={false}
          ref={letterInputRef}
        />
        {
          <Text style={{fontSize: 16}}>
            z:
            {props.guessLetter}
            {/*{annotationToNumber[props.annotation.letterState]},*/}
            {/*{[*/}
            {/*  props.annotation.positionState.uyir ? 1 : 0,*/}
            {/*  props.annotation.positionState.mei ? 1 : 0,*/}
            {/*]}*/}
          </Text>
        }
      </View>
    </Pressable>
  );
};
