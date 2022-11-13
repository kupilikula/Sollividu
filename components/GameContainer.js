import React, {useEffect, useRef, useState} from 'react';
import {GuessList} from './GuessList';
import {
  Alert,
  findNodeHandle,
  Linking,
  Pressable,
  Text,
  UIManager,
  View,
} from 'react-native';
import {styleSheet} from '../styles/styleSheet';
import {useDispatch, useSelector} from 'react-redux';
import {addGuess, giveUpGame, initializeNewGameState} from '../store/actions';
import {TamilLetterUtils} from '../utils/TamilLetterUtils';
import {TamilStringUtils} from '../utils/TamilStringUtils';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button} from './Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {constants} from '../utils/constants';
import {colorPalette} from '../styles/colorPalette';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {HelpModal} from './HelpModal';
import statisticsUtils from '../utils/statisticsUtils';
import {StatisticsModal} from './StatisticsModal';
import wordListUtils from '../utils/wordListUtils';
import {SettingsModal} from './SettingsModal';
import usageDataUtils from '../utils/usageDataUtils';

const tamilLetterUtils = TamilLetterUtils();

export const GameContainer = props => {
  const dispatch = useDispatch();
  const currentGuessLetters = useSelector(state => state.currentGuessLetters);
  const secretWordLetters = useSelector(state => state.secretWordLetters);
  const gameOver = useSelector(state => state.gameOver);
  const wordGuessed = useSelector(state => state.wordGuessed);
  const currentGuessNumber = useSelector(state => state.currentGuessNumber);
  const storeWordLength = useSelector(state => state.wordLength);
  let settingsWordLength = storeWordLength;

  const secretWordMeaningURL =
    'https://dsal.uchicago.edu/cgi-bin/app/tamil-lex_query.py?qs=' +
    secretWordLetters.join('') +
    '&searchhws=yes&matchtype=exact';

  const validateWord = async letters => {
    let letterCheck = letters.every(
      l => l !== '' && tamilLetterUtils.Letters.flat().includes(l)
    );

    if (letterCheck) {
      let wordCheck = wordListUtils.checkWordInWordList(
        letters.join(''),
        letters.length
      );
      return wordCheck;
    } else {
      return false;
    }
  };

  const onSubmitGuess = async () => {
    console.log('inside gamecontainer onsubmitGuess');
    let check = await validateWord(currentGuessLetters);
    console.log('validateWord:', check);
    if (check) {
      dispatch(addGuess(currentGuessLetters));
    }
  };

  const onClear = () => {
    dispatch(
      initializeNewGameState({
        secretWordLetters: null,
        numberOfGuesses: null,
      })
    );
  };
  const onNewGame = async wordLength => {
    console.log('inside onNewGame');

    let newSecretWord;
    while (true) {
      newSecretWord = await wordListUtils.getNewRandomWord(wordLength);
      if (!statisticsUtils.hasWordBeenPlayedAlready(newSecretWord)) {
        break;
      }
    }

    console.log(
      'letters:',
      TamilStringUtils().splitIntoTamilLetters(newSecretWord)
    );
    dispatch(
      initializeNewGameState({
        secretWordLetters:
          TamilStringUtils().splitIntoTamilLetters(newSecretWord),
        numberOfGuesses: constants.numberOfGuesses,
      })
    );
  };
  const scrollViewRef = useRef(null);

  const scrollToInput = inputNode => {
    // Add a 'scroll' ref to your ScrollView
    console.log('scrollViewRef.current:', scrollViewRef.current);
    console.log('inputNode:', inputNode);
    let handle = findNodeHandle(inputNode);
    console.log('handle:', handle);
    let newPageY;
    UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      newPageY = pageY;
      console.log('measure:', x, y, width, height, pageX, pageY);
      console.log('newPageY', newPageY);
      console.log('screenHeight:', constants.screenHeight);

      if (newPageY > constants.screenHeight * 0.5) {
        console.log('inside condition for scroll');
        scrollViewRef.current.scrollTo({
          y: handle,
          animated: true,
        });
      }
    });
  };

  const onTileFocus = focusedInputNode => {
    console.log('inside onTileFocus:', focusedInputNode);
    scrollToInput(focusedInputNode);
  };

  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [statisticsModalVisible, setStatisticsModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  useEffect(() => {
    const callOnNewGame = async () => {
      await onNewGame(storeWordLength ? storeWordLength : 5);
    };
    callOnNewGame().catch(console.error);
    const data = statisticsUtils.getStatistics();
    console.log('data:', data);
    setStats(data);
  }, []);

  useEffect(() => {
    if (gameOver) {
      statisticsUtils.updateGameHistory(
        secretWordLetters.join(''),
        wordGuessed,
        currentGuessNumber,
        storeWordLength
      );
      const data = statisticsUtils.getStatistics();
      console.log('data:', data);
      setStats(data);
      usageDataUtils.sendUsageData();
    }
  }, [gameOver]);

  const [stats, setStats] = useState({
    totalGamesPlayed: -1,
    totalVictories: -1,
    gamesPlayedByWordLength: {3: -1, 4: -1, 5: -1, 6: -1},
    victoriesByWordLength: {3: -1, 4: -1, 5: -1, 6: -1},
  });

  const giveUp = () => {
    dispatch(giveUpGame({}));
  };

  const onGiveUpPress = () => {
    if (!gameOver) {
      Alert.alert('ராஜினாமா செய்?', 'ஆட்டத்தை ராஜினாமா செய்து விடையை காண்பி?', [
        {
          text: 'ரத்து செய்',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'சரி',
          onPress: () => {
            giveUp();
            console.log('OK Pressed');
          },
        },
      ]);
    }
  };

  return (
    <KeyboardAwareScrollView
      innerRef={val => {
        scrollViewRef.current = val;
      }}
      style={{backgroundColor: colorPalette.blue, height: 2000, flex: 1}}
      contentContainerStyle={{flexGrow: 1}}
      nestedScrollEnabled={true}
      enableOnAndroid={true}
      enableResetScrollToCoords={false}
      contentInsetAdjustmentBehavior="always"
      overScrollMode="always"
      showsVerticalScrollIndicator={false}
      bounces={false}
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      extraHeight={0}
      extraScrollHeight={0}>
      <View style={styleSheet.gameContainer}>
        <HelpModal
          visible={helpModalVisible}
          setHelpModalVisible={setHelpModalVisible}
        />
        <StatisticsModal
          visible={statisticsModalVisible}
          setStatisticsModalVisible={setStatisticsModalVisible}
          stats={stats}
        />
        <SettingsModal
          visible={settingsModalVisible}
          setSettingsModalVisible={setSettingsModalVisible}
          currentWordLength={storeWordLength}
          startNewGame={wl => onNewGame(wl)}
        />

        <View
          style={{
            marginTop: 150,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width:
                storeWordLength * constants.letterTileSize +
                storeWordLength * 4 * constants.tileBorderWidth,
              marginBottom: 15,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Pressable
                style={{marginRight: 10}}
                onPress={() => {
                  console.log('inside onPress SettingsIcon');
                  setSettingsModalVisible(true);
                  console.log(
                    'statsModalVisible inside onPress after set to true:',
                    settingsModalVisible
                  );
                }}>
                <IoniconsIcon
                  name="settings-sharp"
                  size={30}
                  color={colorPalette.white}
                />
              </Pressable>
              <Pressable
                style={{}}
                onPress={() => {
                  console.log('inside onPress StatisticsIcon');
                  setStatisticsModalVisible(true);
                  console.log(
                    'statsModalVisible inside onPress after set to true:',
                    statisticsModalVisible
                  );
                }}>
                <IoniconsIcon
                  name="stats-chart-sharp"
                  size={30}
                  color={colorPalette.white}
                />
              </Pressable>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Pressable
                style={{marginRight: 8}}
                onPress={() => {
                  console.log('inside onPress GiveUpIcon');
                  onGiveUpPress();
                }}>
                <IoniconsIcon
                  name="exit"
                  size={35}
                  color={colorPalette.white}
                />
              </Pressable>
              <Pressable
                style={{}}
                onPress={() => {
                  console.log('inside onPress HelpIcon');
                  setHelpModalVisible(true);
                  console.log(
                    'helpModalVisible inside onPress after set to true:',
                    helpModalVisible
                  );
                }}>
                <Icon name="help" size={30} color={colorPalette.white} />
              </Pressable>
            </View>
          </View>
          <GuessList onSubmitGuess={onSubmitGuess} onTileFocus={onTileFocus} />
          {gameOver && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                marginTop: 15,
                marginBottom: 15,
              }}>
              <Text style={styleSheet.secretWordLabel}>விடை:</Text>
              <Text
                style={styleSheet.secretWord}
                onPress={() => Linking.openURL(secretWordMeaningURL)}>
                {secretWordLetters.join('')}
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/*<Button label="Submit Word" onPress={onSubmitGuess} />*/}
            {/*<Button label="Clear Game" onPress={onClear} />*/}
            {gameOver && (
              <Button
                label="புது ஆட்டம்"
                onPress={() => onNewGame(storeWordLength)}
              />
            )}
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
