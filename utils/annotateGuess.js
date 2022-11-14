import {TamilLetterUtils} from './TamilLetterUtils';

export const GuessLetterTileStates = {
  LETTER_NOT_FOUND: 'LETTER_NOT_FOUND',
  LETTER_MATCHED: 'LETTER_MATCHED',
  LETTER_ELSEWHERE: 'LETTER_ELSEWHERE',
  UYIR_MATCHED: 'UYIR_MATCHED',
  MEI_MATCHED: 'MEI_MATCHED',
  NOT_ANNOTATED: 'NOT_ANNOTATED',
};

const tamilLetterUtils = TamilLetterUtils();

export const annotateGuess = (guessLetters, secretWordLetters) => {
  let n = secretWordLetters.length;
  let annotation = [...Array(n)].map(a => {
    return {
      letterState: GuessLetterTileStates.NOT_ANNOTATED,
      positionState: {uyir: null, mei: null},
    };
  });
  for (let i = 0; i < n; i++) {
    // console.log('i,g[i],w[i]', i, guessLetters[i], secretWordLetters[i]);
    // console.log('i, check:', i, guessLetters[i] === secretWordLetters[i]);
    if (guessLetters[i] === secretWordLetters[i]) {
      annotation[i].letterState = GuessLetterTileStates.LETTER_MATCHED;
      // console.log(
      //   'inside match, i:',
      //   i,
      //   'annotation[i].letterState:',
      //   annotation[i].letterState
      // );
    } else if (secretWordLetters.includes(guessLetters[i])) {
      annotation[i].letterState = GuessLetterTileStates.LETTER_ELSEWHERE;
    } else {
      // console.log(
      //   'inside else, i:',
      //   i,
      //   ', annotation[i].letterState: ',
      //   annotation[i].letterState
      // );
      annotation[i].letterState = GuessLetterTileStates.LETTER_NOT_FOUND;
    }

    const [consonant_index, vowel_index] =
      tamilLetterUtils.LetterToIndices[guessLetters[i]];
    const [secret_consonant_index, secret_vowel_index] =
      tamilLetterUtils.LetterToIndices[secretWordLetters[i]];

    annotation[i].positionState.mei =
      consonant_index === secret_consonant_index;
    annotation[i].positionState.uyir = vowel_index === secret_vowel_index;
  }

  // console.log('inside annotateGuess, annotation:', annotation);
  return annotation;
};
