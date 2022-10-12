import {Platform, Text, View} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import React from 'react';
import {colorPalette} from '../styles/colorPalette';

const Header = props => {
  return (
    <View
      style={{
        zIndex: 10,
        backgroundColor: colorPalette.red,
        position: 'absolute',
        width: '100%',
        top: 0,
        shadowColor: colorPalette.red,
        shadowOpacity: 0.8,
        shadowRadius: 15,
        ...Platform.select({
          android: {
            elevation: 15,
          },
        }),
      }}>
      <Text style={styleSheet.appTitle}>சொல்லிவிடு</Text>
    </View>
  );
};

export default Header;
