import {getLetterPos} from './tamilLetters';

export const GuessLetterTileStates = {
  LETTER_NOT_FOUND: 'LETTER_NOT_FOUND',
  LETTER_MATCHED: 'LETTER_MATCHED',
  LETTER_ELSEWHERE: 'LETTER_ELSEWHERE',
  UYIR_MATCHED: 'UYIR_MATCHED',
  MEI_MATCHED: 'MEI_MATCHED',
  NOT_ANNOTATED: 'NOT_ANNOTATED',
};

export const annotateGuess = (guessLetters, secretWord) => {
  let n = secretWord.length;
  let annotation = [...Array(n)].map(a => {
    return {
      letterState: GuessLetterTileStates.NOT_ANNOTATED,
      positionState: {uyir: null, mei: null},
    };
  });
  for (let i = 0; i < n; i++) {
    console.log('i,g[i],w[i]', i, guessLetters[i], secretWord[i]);
    console.log('i, check:', i, guessLetters[i] === secretWord[i]);
    if (guessLetters[i] === secretWord[i]) {
      annotation[i].letterState = GuessLetterTileStates.LETTER_MATCHED;
      console.log(
        'inside match, i:',
        i,
        'annotation[i].letterState:',
        annotation[i].letterState
      );
    } else if (secretWord.includes(guessLetters[i])) {
      annotation[i].letterState = GuessLetterTileStates.LETTER_ELSEWHERE;
    } else {
      console.log(
        'inside else, i:',
        i,
        ', annotation[i].letterState: ',
        annotation[i].letterState
      );
      annotation[i].letterState = GuessLetterTileStates.LETTER_NOT_FOUND;
    }

    const [consonant_index, vowel_index] = getLetterPos(guessLetters[i]);
    const [secret_consonant_index, secret_vowel_index] = getLetterPos(
      secretWord[i]
    );

    annotation[i].positionState.mei =
      consonant_index === secret_consonant_index;
    annotation[i].positionState.uyir = vowel_index === secret_vowel_index;
  }

  console.log('inside annotateGuess, annotation:', annotation);
  return annotation;
};
