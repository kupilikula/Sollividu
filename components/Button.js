import {Text, TouchableOpacity} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import React from 'react';

export const Button = props => {
  return (
    <TouchableOpacity
      // containerStyle={{overflow: 'visible'}}
      activeOpacity={0.8}
      style={styleSheet.button}
      onPress={props.onPress}>
      <Text style={{color: 'white', margin: 10}}>{props.label}</Text>
    </TouchableOpacity>
  );
};
