import {MMKV} from 'react-native-mmkv';
const mmkvStore = new MMKV();

const updateGameHistory = (
  secretWord,
  wordGuessed,
  numberOfGuesses,
  wordLength
) => {
  initializeGameHistoryIfEmpty();
  mmkvStore.set(
    'playedWordList',
    mmkvStore.getString('playedWordList') + ',' + secretWord
  );
  mmkvStore.set(
    'gameResultList',
    mmkvStore.getString('gameResultList') + ',' + wordGuessed.toString()
  );
  mmkvStore.set(
    'wordLengthList',
    mmkvStore.getString('wordLengthList') + ',' + wordLength.toString()
  );
  mmkvStore.set(
    'numberOfGuessesList',
    mmkvStore.getString('numberOfGuessesList') + ',' + wordLength.toString()
  );

  console.log(
    'inside update game history, after:',
    mmkvStore.getString('playedWordList')
  );
};

const hasWordBeenPlayedAlready = word => {
  initializeGameHistoryIfEmpty();
  return mmkvStore.getString('playedWordList').split(',').includes(word);
};

const getStatistics = () => {
  initializeGameHistoryIfEmpty();
  let gameResultList = mmkvStore
    .getString('gameResultList')
    .split(',')
    .filter(s => s)
    .map(s => s === 'true');
  let numberOfGuessesList = mmkvStore
    .getString('numberOfGuessesList')
    .split(',')
    .filter(s => s)
    .map(s => parseInt(s, 10));
  let wordLengthList = mmkvStore
    .getString('wordLengthList')
    .split(',')
    .filter(s => s)
    .map(s => parseInt(s, 10));

  let totalGamesPlayed = gameResultList.length;
  let totalVictories = gameResultList.reduce((S, v) => S + (v ? 1 : 0), 0);

  return {
    totalGamesPlayed: totalGamesPlayed,
    totalVictories: totalVictories,
  };
};

const initializeGameHistoryIfEmpty = () => {
  if (!mmkvStore.contains('playedWordList')) {
    mmkvStore.set('playedWordList', '');
  }

  if (!mmkvStore.contains('gameResultList')) {
    mmkvStore.set('gameResultList', '');
  }

  if (!mmkvStore.contains('wordLengthList')) {
    mmkvStore.set('wordLengthList', '');
  }

  if (!mmkvStore.contains('numberOfGuessesList')) {
    mmkvStore.set('numberOfGuessesList', '');
  }
};

module.exports = {
  updateGameHistory,
  hasWordBeenPlayedAlready,
  getStatistics,
  initializeGameHistoryIfEmpty,
};
