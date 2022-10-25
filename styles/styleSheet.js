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
    height: constants.screenHeight * 1.5,
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
    backgroundColor: 'transparent',
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
  letterTileText: (isAnnotated, useSmallerFontSize, useSmallestFontSize) => {
    return {
      alignContent: 'center',
      justifyContent: 'center',
      fontFamily: 'Noto Sans Tamil',
      fontWeight: '700',
      fontSize: useSmallestFontSize ? 13 : useSmallerFontSize ? 14 : 16,
      color: isAnnotated ? colorPalette.white : colorPalette.black,
      position: 'absolute',
      lineHeight: constants.letterTileSize,
    };
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

  secretWord: {
    fontFamily: 'Noto Sans Tamil',
    fontWeight: '700',
    fontSize: 20,
    color: colorPalette.white,
    textDecorationLine: 'underline',
  },
  secretWordLabel: {
    fontFamily: 'Noto Sans Tamil',
    fontWeight: '500',
    fontSize: 16,
    color: colorPalette.black,
    marginRight: 15,
  },

  helpModalTitle: {
    fontFamily: 'Noto Sans Tamil',
    fontWeight: '700',
    fontSize: 24,
    color: colorPalette.white,
    marginBottom: 15,
    marginTop: 15,
    alignSelf: 'center',
  },

  helpModalText: {
    fontFamily: 'Noto Sans Tamil',
    fontWeight: '500',
    fontSize: 15,
    color: colorPalette.white,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
    flexShrink: 1,
  },

  helpModalSmallText: {
    fontFamily: 'Noto Sans Tamil',
    fontWeight: '500',
    fontSize: 12,
    color: colorPalette.white,
    alignSelf: 'center',
    margin: 10,
    flexShrink: 1,
  },
};
