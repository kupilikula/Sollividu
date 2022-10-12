import {constants} from '../utils/constants';
import {GuessLetterTileStates} from '../utils/annotateGuess';
import {colorPalette} from './colorPalette';

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
    backgroundColor: colorPalette.blue,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
    // alignContent: 'center',
    // borderWidth: 1,
    // borderColor: 'black',
    // marginTop: '5%',
    width: '100%',
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
    padding: constants.tileBorderWidth,
    margin: 2 * constants.tileBorderWidth,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  letterTileActive: {
    backgroundColor: colorPalette.white,
    borderWidth: 0,
  },
  letterTileFocussed: {
    borderWidth: 2,
    borderColor: colorPalette.black,
  },
  letterTileFuture: {
    backgroundColor: colorPalette.black,
    borderWidth: 0,
  },

  letterTileAnnotated: annotation => {
    return {
      backgroundColor:
        annotation.letterState === GuessLetterTileStates.LETTER_MATCHED
          ? colorPalette.green
          : annotation.letterState === GuessLetterTileStates.LETTER_NOT_FOUND
          ? colorPalette.gray // dark gray
          : annotation.letterState === GuessLetterTileStates.LETTER_ELSEWHERE
          ? colorPalette.yellow
          : null, // this color should never actually be applied
      borderWidth: 0,
      color: colorPalette.white,
    };
  },

  letterTileInput: {
    color: 'transparent',
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
