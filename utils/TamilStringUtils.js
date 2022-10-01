const {TamilLetterUtils} = require('./TamilLetterUtils');

const tamilLetterUtils = TamilLetterUtils();

const TamilStringUtils = () => {
  const processHeadWord = s => {
    s = s.trim().replace(/-/g, ''); // trim and remove dashes
    if (s.includes(',')) {
      return s
        .split(',')
        .map(a => processHeadWord(a))
        .flat();
    }

    if (s.includes(' ')) {
      return s
        .split(' ')
        .map(a => processHeadWord(a))
        .flat();
    }
    return [s];
  };

  const validateTamilString = s => {
    let previousCharWasDiacritic = true;

    for (let i = 0; i < s.length; i++) {
      let c = s[i];
      if (tamilLetterUtils.Diacritics.includes(c)) {
        if (previousCharWasDiacritic) {
          // two diacritics in a row.
          return false;
        } else {
          previousCharWasDiacritic = true;
        }
      } else if (tamilLetterUtils.Letters.flat().includes(c)) {
        previousCharWasDiacritic = false;
      } else {
        // character is neither a diacritic or a letter
        return false;
      }
    }
    return true;
  };

  const splitIntoTamilLetters = s => {
    let check = validateTamilString(s);
    if (!check) {
      return null;
    }

    let letters = [];
    for (let i = 0; i < s.length; i++) {
      let c = s[i];
      tamilLetterUtils.Diacritics.includes(c)
        ? (letters[letters.length - 1] += c)
        : letters.push(c);
    }
    return letters;
  };

  const tamilWordLength = s => {
    let letters = splitIntoTamilLetters(s);
    if (letters === null) {
      return null;
    }
    return letters.length;
  };

  return {
    processHeadWord,
    validateTamilString,
    splitIntoTamilLetters,
    tamilWordLength,
  };
};

module.exports = {TamilStringUtils};
