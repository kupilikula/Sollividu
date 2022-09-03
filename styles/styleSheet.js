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
    borderWidth: constants.tileBorderWidth,
  },
  gameContainer: {
    flexDirection: 'column',
    backgroundColor: 'green',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: constants.tileBorderWidth,
    marginTop: '10%',
    width: '90%',
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
    borderWidth: constants.tileBorderWidth,
    margin: constants.tileBorderWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterTileInput: {
    fontSize: 16,
    color: 'black',
  },
  letterTileInactive: {
    backgroundColor: 'grey',
  },
  letterTileActive: {
    backgroundColor: 'white',
  },
};
