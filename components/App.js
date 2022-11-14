import React, {useEffect, useState} from 'react';

import {GameContainer} from './GameContainer';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {reducer} from '../store/reducer';
import {newGameState} from '../store/newGameState';
import {Provider} from 'react-redux';
import Header from './Header';
import {changeBarColors} from 'react-native-immersive-bars';
import {NavigationContainer} from '@react-navigation/native';
import {TamilStringUtils} from '../utils/TamilStringUtils';
import {constants} from '../utils/constants';

let gameStore;

const initialSecretWordLetters =
  TamilStringUtils().splitIntoTamilLetters('மரவள்ளி');
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
    changeBarColors(false, 'red', 'red');
  }, []);

  return (
    <Provider store={gameStore}>
      <NavigationContainer>
        <Header />
        <GameContainer />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
