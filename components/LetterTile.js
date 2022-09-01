import React, {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {Letters} from '../utils/tamilLetters.js';
import '../utils/unicodeUtils';
import {currentGuessEdited} from '../store/actions';
import {useDispatch, useSelector, useStore} from 'react-redux';

export const LetterTile = props => {
  const [letter, setLetter] = useState('');
  const dispatch = useDispatch();
  const store = useStore();

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
      console.log('input:', input, ', f:', f);
      if (validateLetter(f)) {
        setLetter(f);
      } else {
        setLetter('');
      }
    }
  };

  useEffect(() => {
    console.log('about to dispatch, letter:', letter);
    dispatch(currentGuessEdited({position: props.position, letter: letter}));
    // console.log('LetterTile edited, store:', store.getState());
  }, [letter]);

  return (
    <View style={styleSheet.letterTile}>
      <TextInput
        style={styleSheet.letterTileInput}
        onChangeText={input => onLetterInput(input)}
        value={letter}
        editable={props.isActive}
      />
    </View>
  );
};
