import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {GameContainer} from './GameContainer';
import {styleSheet} from '../styles/styleSheet';
import {configureStore} from '@reduxjs/toolkit';
import {reducer} from '../store/reducer';
import {newGameState} from '../store/newGameState';
import {Provider, useDispatch} from 'react-redux';
import {changeBarColors} from 'react-native-immersive-bars';
import {initializeNewGameState} from '../store/actions';

const secretWordLetters = ['பி', 'ரி', 'யா', 'னி', 'சோ', 'று'];
const numberOfGuesses = 8;
const currentGameState = newGameState(secretWordLetters, numberOfGuesses);

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
