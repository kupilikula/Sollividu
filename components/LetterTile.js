import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {Letters} from '../utils/tamilLetters.js';
import '../utils/unicodeUtils';
import {currentGuessEdited} from '../store/actions';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {GuessLetterTileStates} from '../utils/annotateGuess';

export const LetterTile = props => {
  const [letter, setLetter] = useState('');
  const dispatch = useDispatch();

  const validateLetter = l => {
    return l === '' || Letters.flat().includes(l);
  };

  const onLetterInput = input => {
    if (input.length > 2) {
      input = input.substring(0, 2);
    }

    if (input === '') {
      setLetter('');
    } else if (input.unicodeLength() === 1) {
      let f = input.unicodeCharAt(0);
      if (validateLetter(f)) {
        setLetter(f);
      } else {
        setLetter('');
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
    dispatch(currentGuessEdited({position: props.position, letter: letter}));
  }, [letter]);

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
          onChangeText={input => onLetterInput(input)}
          onSubmitEditing={handleSubmitGuess}
          value={letter}
          editable={props.isActive}
          caretHidden={true}
          autoCorrect={false}
          ref={letterInputRef}
        />
        {
          <Text>
            {annotationToNumber[props.annotation.letterState]},
            {[
              props.annotation.positionState.mei ? 1 : 0,
              props.annotation.positionState.uyir ? 1 : 0,
            ]}
          </Text>
        }
      </View>
    </Pressable>
  );
};
