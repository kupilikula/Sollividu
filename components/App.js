import React, {useEffect, useState} from 'react';

import {GameContainer} from './GameContainer';
import {configureStore} from '@reduxjs/toolkit';
import {reducer} from '../store/reducer';
import {newGameState} from '../store/newGameState';
import {Provider} from 'react-redux';
import Header from './Header';
import {changeBarColors} from 'react-native-immersive-bars';
import {Platform, View} from 'react-native';
import {loadWordLists} from '../utils/loadWordList';
import {NavigationContainer} from '@react-navigation/native';

const secretWordLetters = ['பி', 'ரி', 'யா', 'னி', 'சோ', 'று'];
const currentGameState = newGameState(secretWordLetters);

const gameStore = configureStore({
  reducer: reducer(currentGameState),
  preloadedState: currentGameState,
  devTools: true,
});

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // loading checks, if anything needs to be loaded before starting app
    if (true) {
      console.log('inside loading effect.');
      setLoading(false);
    }
    console.log('inside use effect');
    changeBarColors(false, 'red', 'red');
  }, []);
  // console.log('app guesses:', gameStore.getState());

  return (
    <Provider store={gameStore}>
      <NavigationContainer>
        <View style={{flex: 1, height: 1800}}>
          <Header />
          <GameContainer />
        </View>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
