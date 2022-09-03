import type {Node} from 'react';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {GameContainer} from './GameContainer';
import {styleSheet} from '../styles/styleSheet';
import {configureStore} from '@reduxjs/toolkit';
import {reducer} from '../store/reducer';
import {initialState} from '../store/initialState';
import {Provider} from 'react-redux';
import {initializeState} from '../store/actions';
import {changeBarColors} from 'react-native-immersive-bars';
import {composeWithDevTools} from '@redux-devtools/extension';

const gameStore = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  devTools: true,
});

const App: () => Node = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // loading checks, if anything needs to be loaded before starting app
    if (true) {
      console.log('inside loading effect.');
      gameStore.dispatch(initializeState(''));
      setLoading(false);
    }
    console.log('inside use effect');
    changeBarColors(false, 'red', 'red');
  }, []);

  // console.log('app guesses:', gameStore.getState());
  return (
    <Provider store={gameStore}>
      {/*<SafeAreaView>*/}
      {/*<StatusBar backgroundColor={'red'} />*/}
      <View style={styleSheet.appBackground}>
        <Text style={styleSheet.appTitle}>மொழி</Text>
        <GameContainer />
      </View>
      {/*</SafeAreaView>*/}
    </Provider>
  );
};

export default App;
