import {constants} from '../utils/constants';

export const styleSheet = {
  appBackground: {
    backgroundColor: 'red',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  appTitle: {
    fontSize: 40,
    marginTop: '10%',
    borderWidth: constants.halfBorderWidth,
  },
  gameContainer: {
    flexDirection: 'column',
    backgroundColor: 'green',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: constants.halfBorderWidth,
    marginTop: '10%',
    width: '90%',
    // marginBottom: '10%',
  },
  guessList: {
    height:
      constants.letterTileSize * constants.numberOfGuesses +
      2 * constants.halfBorderWidth,
    flexDirection: 'column',
    borderWidth: constants.halfBorderWidth,
    // alignSelf: 'center',
    backgroundColor: 'yellow',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guess: {
    flexDirection: 'row',
  },
  letterTile: {
    height: constants.letterTileSize,
    width: constants.letterTileSize,
    borderWidth: constants.halfBorderWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterTileInput: {
    fontSize: 20,
    color: 'black',
  },
};
