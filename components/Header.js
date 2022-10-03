import {Platform, Text, View} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import React from 'react';

const Header = props => {
  return (
    <View
      style={{
        zIndex: 10,
        backgroundColor: '#aa2222',
        position: 'absolute',
        width: '100%',
        top: 0,
        // borderBottomWidth: 1,
        // borderColor: 'black',
        shadowColor: '#aa2222',
        shadowOpacity: 0.8,
        shadowRadius: 15,
        ...Platform.select({
          android: {
            elevation: 15,
          },
        }),
      }}
      onLayout={event => {
        const {x, y, width, height} = event.nativeEvent.layout;
        console.log('height:', height);
        props.storeHeaderHeight(height);
      }}>
      <Text style={styleSheet.appTitle}>சொல்லிவிடு</Text>
    </View>
  );
};

export default Header;
