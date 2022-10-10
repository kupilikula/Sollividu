import {constants} from '../utils/constants';
import {GuessLetterTileStates} from '../utils/annotateGuess';

export const styleSheet = {
  appTitle: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    // fontWeight: 'SemiBold',
    fontFamily: 'Arima-SemiBold',
    color: 'black',
    marginTop: '15%',
    marginBottom: 0,
    paddingBottom: 0,
    // borderWidth: constants.tileBorderWidth,
  },
  gameContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'green',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
    // alignContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    // marginTop: '5%',
    width: '100%',
    height: 1600,
    // position: 'absolute',
    // top: 0,
    // marginBottom: '10%',
  },
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
  letterTileActive: {
    backgroundColor: '#ffffff',
    borderWidth: constants.tileBorderWidth,
    borderColor: '#d3d6da',
  },
  letterTileFocussed: {
    borderColor: '#555555',
  },
  letterTileFuture: {
    backgroundColor: '#222222',
    borderWidth: constants.tileBorderWidth,
    borderColor: '#d3d6da',
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
    color: 'red',
    lineHeight: constants.letterTileSize,
    height: constants.letterTileSize,
    borderWidth: 0,
    fontSize: 20,
    width: '100%',
  },

  button: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5555ff',
    borderWidth: 0,
    borderRadius: 4,
    margin: 5,
    elevation: 10,
    shadowRadius: 1,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowColor: 'black',
    // overflow: 'visible',
  },
};
