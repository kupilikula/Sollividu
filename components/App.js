import React, {useEffect, useState} from 'react';

import {GameContainer} from './GameContainer';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {reducer} from '../store/reducer';
import {newGameState} from '../store/newGameState';
import {Provider} from 'react-redux';
import Header from './Header';
import {changeBarColors} from 'react-native-immersive-bars';
import {TamilStringUtils} from '../utils/TamilStringUtils';
import {constants} from '../utils/constants';
import RNBootSplash from 'react-native-bootsplash';
import {View} from 'react-native';
import {colorPalette} from '../styles/colorPalette';

let gameStore;

const initialSecretWordLetters =
  TamilStringUtils().splitIntoTamilLetters('படம்');
const currentGameState = newGameState(
  initialSecretWordLetters,
  constants.numberOfGuesses
);

const middlewares = getDefaultMiddleware({
  // https://github.com/reduxjs/redux-toolkit/issues/415
  immutableCheck: false,
});

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

gameStore = configureStore({
  reducer: reducer(currentGameState),
  preloadedState: currentGameState,
  middleware: middlewares,
  devTools: true,
});

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // loading checks, if anything needs to be loaded before starting app

    if (true) {
      // console.log('inside loading effect.');
      setLoading(false);
    }
    // console.log('inside use effect');
    changeBarColors(false, 'transparent', 'transparent');
    RNBootSplash.hide();
  }, []);

  return (
    <Provider store={gameStore}>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          backgroundColor: colorPalette.transparent,
          width: '100%',
          height: 'auto',
          alignSelf: 'center',
          alignContent: 'center',
          // alignItems: 'center',
        }}>
        <Header />
        <GameContainer />
      </View>
    </Provider>
  );
};

export default App;
