import {MMKV} from 'react-native-mmkv';
const mmkvStore = new MMKV();

const updateGameHistory = (
  secretWord,
  wordGuessed,
  numberOfGuesses,
  wordLength
) => {
  initializeGameHistoryIfEmpty();
  let newGame = {
    word: secretWord,
    gameResult: wordGuessed,
    numberOfGuesses: numberOfGuesses,
    wordLength: wordLength,
  };
  let currGamesData = JSON.parse(mmkvStore.getString('gamesList'));
  let n_curr_games = currGamesData.games.length;
  if (
    n_curr_games === 0 ||
    currGamesData.games[n_curr_games - 1].word !== newGame.word
  ) {
    currGamesData.games.push(newGame);
    mmkvStore.set('gamesList', JSON.stringify(currGamesData));
  }

  // console.log(
  //   'inside update game history, after:',
  //   mmkvStore.getString('playedWordList')
  // );
};

const hasWordBeenPlayedAlready = word => {
  initializeGameHistoryIfEmpty();
  return JSON.parse(mmkvStore.getString('gamesList'))
    .games.map(g => g.word)
    .includes(word);
};

const getStatistics = () => {
  initializeGameHistoryIfEmpty();
  let gamesData = getGameDataArrays();

  let totalGamesPlayed = gamesData.gameResultList.length;
  let totalVictories = gamesData.gameResultList.reduce(
    (S, v) => S + (v ? 1 : 0),
    0
  );

  let i;
  let gamesPlayedByWordLength = {3: 0, 4: 0, 5: 0, 6: 0};
  let victoriesByWordLength = {3: 0, 4: 0, 5: 0, 6: 0};
  for (i = 0; i < gamesData.wordLengthList.length; i++) {
    gamesPlayedByWordLength[gamesData.wordLengthList[i]]++;
    if (gamesData.gameResultList[i]) {
      victoriesByWordLength[gamesData.wordLengthList[i]]++;
    }
  }

  return {
    totalGamesPlayed: totalGamesPlayed,
    totalVictories: totalVictories,
    gamesPlayedByWordLength: gamesPlayedByWordLength,
    victoriesByWordLength: victoriesByWordLength,
  };
};

const initializeGameHistoryIfEmpty = () => {
  if (!mmkvStore.contains('gamesList')) {
    mmkvStore.set('gamesList', JSON.stringify({games: []}));
  }
};

const getGameDataArrays = () => {
  let gamesListString = mmkvStore.getString('gamesList');
  console.log('gamesListString:', gamesListString);
  let gamesList = JSON.parse(gamesListString).games;

  let playedWordList = gamesList.map(g => g.word);
  let gameResultList = gamesList.map(g => g.gameResult);
  let numberOfGuessesList = gamesList.map(g => g.numberOfGuesses);
  let wordLengthList = gamesList.map(g => g.wordLength);

  return {playedWordList, gameResultList, numberOfGuessesList, wordLengthList};
};

const getGameDataJSON = () => {
  return JSON.parse(mmkvStore.getString('gamesList'));
};

module.exports = {
  updateGameHistory,
  hasWordBeenPlayedAlready,
  getStatistics,
  initializeGameHistoryIfEmpty,
  getGameDataArrays,
  getGameDataJSON,
};
