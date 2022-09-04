import {constants} from '../utils/constants';
import {GuessLetterTileStates} from '../utils/annotateGuess';

export const styleSheet = {
  appBackground: {
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  appTitle: {
    fontSize: 40,
    marginTop: '10%',
    borderWidth: constants.tileBorderWidth,
  },
  gameContainer: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: constants.tileBorderWidth,
    marginTop: '10%',
    width: '95%',
    // marginBottom: '10%',
  },
  // guessList: {
  //   height: 'auto',
  //   flexDirection: 'column',
  //   borderWidth: constants.tileBorderWidth,
  //   // alignSelf: 'center',
  //   backgroundColor: 'yellow',
  //   flexWrap: 'wrap',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  guess: {
    flexDirection: 'row',
  },
  letterTile: {
    height: constants.letterTileSize,
    width: constants.letterTileSize,
    margin: 2 * constants.tileBorderWidth,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  letterTileNotAnnotated: {
    backgroundColor: '#ffffff',
    borderWidth: constants.tileBorderWidth,
    borderColor: '#d3d6da',
  },
  letterTileFocussed: {
    backgroundColor: '#ffffff',
    borderWidth: constants.tileBorderWidth,
    borderColor: '#555555',
  },

  letterTileAnnotated: annotation => {
    return {
      backgroundColor:
        annotation.letterState === GuessLetterTileStates.LETTER_MATCHED
          ? '#6aaa64'
          : annotation.letterState === GuessLetterTileStates.LETTER_NOT_FOUND
          ? '#787c7e' // dark gray
          : annotation.letterState === GuessLetterTileStates.LETTER_ELSEWHERE
          ? '#c9b458'
          : null, // this color should never actually be applied
      borderWidth: 0,
      color: '#ffffff',
    };
  },

  letterTileInput: {
    color: 'transparent',
  },
};
