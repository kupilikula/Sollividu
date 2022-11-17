import {Pressable, ScrollView, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colorPalette} from '../styles/colorPalette';
import {styleSheet} from '../styles/styleSheet';
import {RadioButton} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {Button} from './Button';
import {constants} from '../utils/constants';

export const SettingsModal = props => {
  const radioButtonsData = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: '3',
      value: '3',
      color: colorPalette.white,
      labelStyle: {color: colorPalette.white, fontSize: 20},
    },
    {
      id: '2',
      label: '4',
      value: '4',
      color: colorPalette.white,
      labelStyle: {color: colorPalette.white, fontSize: 20},
    },
    {
      id: '3', // acts as primary key, should be unique and non-empty string
      label: '5',
      value: '5',
      color: colorPalette.white,
      labelStyle: {color: colorPalette.white, fontSize: 20},
    },
    {
      id: '4',
      label: '6',
      value: '6',
      color: colorPalette.white,
      labelStyle: {color: colorPalette.white, fontSize: 20},
    },
    {
      id: '5',
      label: 'ஏதேனும்',
      value: '-1',
      color: colorPalette.white,
      labelStyle: {color: colorPalette.white, fontSize: 20},
    },
  ];

  const [wordLengthChoice, setWordLengthChoice] = useState(
    props.currentWordLength
  );

  let i = radioButtonsData.findIndex(
    d => d.value === props.currentWordLength.toString()
  );
  radioButtonsData[i] = {...radioButtonsData[i], selected: true};
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  const onPressRadioButton = radioButtonsArray => {
    console.log('radio:', radioButtonsArray);
    setRadioButtons(radioButtonsArray);
    const wordLengthChoiceString = radioButtonsArray.filter(x => x.selected)[0]
      .value;
    const wordLengthChoiceInt = parseInt(wordLengthChoiceString);
    setWordLengthChoice(wordLengthChoiceInt);
  };

  const onModalHide = () => {
    if (wordLengthChoice !== props.currentWordLength) {
      setWordLengthChoice(props.currentWordLength);
    }
  };

  const onModalWillShow = () => {
    let i = radioButtonsData.findIndex(
      d => d.value === props.currentWordLength.toString()
    );
    radioButtonsData[i] = {...radioButtonsData[i], selected: true};
    setRadioButtons(radioButtonsData);
  };

  const onSave = () => {
    if (wordLengthChoice !== props.currentWordLength) {
      props.startNewGame(wordLengthChoice);
    }
  };

  return (
    <Modal
      isVisible={props.visible}
      backdropColor={'black'}
      backdropOpacity={0.5}
      onModalWillShow={() => onModalWillShow()}
      statusBarTranslucent={true}
      deviceHeight={constants.screenHeight}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 50,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '95%',
          }}>
          <Pressable
            onPress={() => {
              console.log('onPress of close help modal');
              props.setSettingsModalVisible(false);
            }}>
            <View
              style={{
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                width: 35,
                height: 35,
              }}>
              <MaterialCommunityIcon
                name="close-box"
                size={30}
                color={colorPalette.white}
              />
            </View>
          </Pressable>
        </View>
        <View
          style={{
            width: '95%',
            backgroundColor: colorPalette.black,
            borderWidth: 5,
            borderColor: colorPalette.white,
            borderRadius: 10,
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'flex-start',
          }}>
          <ScrollView>
            <Text style={styleSheet.helpModalTitle}>எழுத்துகள்</Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
              layout={'column'}
              containerStyle={{
                alignItems: 'flex-start',
                marginLeft: 15,
                marginBottom: 15,
              }}
            />
            <View
              style={{
                minWidth: 80,
                alignSelf: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Button label="சேமி" onPress={() => onSave()} />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
