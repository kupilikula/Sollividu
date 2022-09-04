import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {currentGuessEdited} from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';
import {TamilLetterUtils} from '../utils/TamilLetterUtils';
import Icon from 'react-native-vector-icons/Feather';
import {GuessLetterTileStates} from '../utils/annotateGuess';

const tamilLetterUtils = TamilLetterUtils();

export const LetterTile = props => {
  // const [inputLetter, setInputLetter] = useState('');
  const dispatch = useDispatch();
  const [useSmallerFontSize, setUseSmallerFontSize] = useState(false);
  const [useSmallestFontSize, setUseSmallestFontSize] = useState(false);

  const [letterDimensions, setLetterDimensions] = useState([0, 0]);
  // const [selection, setSelection] = useState({
  //   start: 0,
  //   end: 0,
  // });
  // const handleSelectionChange = ({nativeEvent: {selection}}) => {
  //   setSelection(selection);
  // };

  const wordGuessed = useSelector(state => state.wordGuessed);

  const onLayout = event => {
    const {width, height} = event.nativeEvent.layout;
    setLetterDimensions([width, height]);
  };

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
    letterInputRef.current.focus();
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

  const annotationToNumber = {
    LETTER_NOT_FOUND: 0,
    LETTER_MATCHED: 1,
    LETTER_ELSEWHERE: 2,
    NOT_ANNOTATED: 'x',
  };
  const letterInputRef = useRef(null);

  const [isFocussed, setIsFocussed] = useState(false);

  return (
    <Pressable onPress={focusTextInput}>
      <View
        style={[
          styleSheet.letterTile,
          props.isAnnotated
            ? styleSheet.letterTileAnnotated(props.annotation)
            : isFocussed
            ? styleSheet.letterTileFocussed
            : styleSheet.letterTileNotAnnotated,
        ]}>
        {/*<View style={{position: 'relative'}}>*/}
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
          onLayout={onLayout}
          style={{
            fontWeight: '900',
            fontSize: useSmallestFontSize ? 18 : useSmallerFontSize ? 22 : 24,
            color: props.isAnnotated ? '#ffffff' : '#000000',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [
              {translateX: -letterDimensions[0] / 2},
              {translateY: -letterDimensions[1] / 2},
            ],
          }}>
          {props.guessLetter}
        </Text>
        <TextInput
          style={styleSheet.letterTileInput}
          selection={{
            start: props.guessLetter.length,
            end: props.guessLetter.length,
          }}
          onFocus={() => {
            setIsFocussed(true);
          }}
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
        {
          // <Text style={{fontSize: 16}}>
          //   {props.guessLetter}
          //   {annotationToNumber[props.annotation.letterState]},
          //   {[
          //     props.annotation.positionState.uyir ? 1 : 0,
          //     props.annotation.positionState.mei ? 1 : 0,
          //   ]}
          // </Text>
        }
        {/*</View>*/}
      </View>
    </Pressable>
  );
};
