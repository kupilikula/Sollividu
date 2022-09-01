import type {Node} from 'react';
import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';

import {GameContainer} from './GameContainer';
import {styleSheet} from '../styles/styleSheet';
import {configureStore} from '@reduxjs/toolkit';
import {reducer} from '../store/reducer';
import {initialState} from '../store/initialState';
import {Provider} from 'react-redux';
import {addGuess, initializeGuesses} from '../store/actions';

const App: () => Node = () => {
  const gameStore = configureStore({
    reducer: reducer,
    preloadedState: initialState,
  });
  gameStore.dispatch(initializeGuesses(''));
  // console.log('app guesses:', gameStore.getState());
  return (
    <Provider store={gameStore}>
      <SafeAreaView>
        <StatusBar />
        <View style={styleSheet.appBackground}>
          <Text style={styleSheet.appTitle}>மொழி</Text>
          <GameContainer />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
