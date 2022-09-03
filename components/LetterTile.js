import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {currentGuessEdited} from '../store/actions';
import {useDispatch} from 'react-redux';
import {TamilStringUtils} from '../utils/TamilStringUtils';
const tamilStringUtils = TamilStringUtils();

export const LetterTile = props => {
  const [inputLetter, setInputLetter] = useState('');
  const dispatch = useDispatch();
  const [useSmallerFontSize, setUseSmallerFontSize] = useState(false);

  const validateLetter = l => {
    return l === '' || tamilStringUtils.Letters.flat().includes(l);
  };

  const onLetterInput = textInputValue => {
    if (textInputValue.length > 2) {
      textInputValue = textInputValue.substring(0, 2);
    }

    if (textInputValue === '') {
      setInputLetter('');
    } else if (tamilStringUtils.getTamilWordLength(textInputValue) === 1) {
      let f = tamilStringUtils.getTamilLetterAt(textInputValue, 0);
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
    console.log(
      'inside useeffect, inputLetter:',
      inputLetter,
      ',check:',
      tamilStringUtils.LongLetters.includes(inputLetter),
      'inputLetterUnicode',
      tamilStringUtils.toUnicode(inputLetter)
    );
    setUseSmallerFontSize(tamilStringUtils.LongLetters.includes(inputLetter));
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
          style={{fontSize: useSmallerFontSize ? 15 : 22, color: 'black'}}
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
            {props.guessLetter}
            {annotationToNumber[props.annotation.letterState]},
            {[
              props.annotation.positionState.uyir ? 1 : 0,
              props.annotation.positionState.mei ? 1 : 0,
            ]}
          </Text>
        }
      </View>
    </Pressable>
  );
};
