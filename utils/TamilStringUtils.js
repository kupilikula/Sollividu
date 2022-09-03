const diacritics = {
  '\u0B82': true,
  '\u0BBE': true,
  '\u0BBF': true,
  '\u0BC0': true,
  '\u0BC1': true,
  '\u0BC2': true,
  '\u0BC6': true,
  '\u0BC7': true,
  '\u0BC8': true,
  '\u0BCA': true,
  '\u0BCB': true,
  '\u0BCC': true,
  '\u0BCD': true,
  '\u0BD7': true,
};

export const TamilStringUtils = {
  toUnicode: function (s) {
    let result = '';
    for (let i = 0; i < s.length; i++) {
      // Assumption: all characters are < 0xffff
      result +=
        '\\u{' + ('000' + s[i].charCodeAt(0).toString(16)).substr(-4) + '}';
    }
    return result;
  },
  getTamilLetterArray: function (s) {
    let tamilLetterArray = [];
    for (let i = 0; i < s.length; i++) {
      let ch = s[i];
      diacritics[ch]
        ? (tamilLetterArray[tamilLetterArray.length - 1] += ch)
        : tamilLetterArray.push(ch);
    }
    return tamilLetterArray;
  },

  getTamilWordLength: function (s) {
    return this.getTamilLetterArray(s).length;
  },
  getTamilLetterAt: function (s, pos) {
    if (s.length === 0) {
      return '';
    }
    return this.getTamilLetterArray(s)[pos];
  },
};
