const {TamilStringUtils} = require('./TamilStringUtils');
const fs = require('fs');

const tamilStringUtils = TamilStringUtils();

const writeArrayToFile = (A, filename) => {
  const file = fs.createWriteStream(filename);
  A.forEach(s => file.write(s + '\n'));
  file.end();
};

const words_raw = fs
  .readFileSync('tamillexicon_headwords.txt', 'utf-8')
  .split('\n');
const words_no_dashes = words_raw.map(s =>
  tamilStringUtils.removeDashes(s.trim())
);

writeArrayToFile(words_no_dashes, 'tamillexicon_no_dashes.txt');

const unique_words = Array.from(new Set(words_no_dashes));
writeArrayToFile(unique_words, 'tamillexicon_unique_words.txt');

const wordLengths = unique_words.map(s => tamilStringUtils.tamilWordLength(s));
const wordLength_values = Array.from(new Set(wordLengths)).sort(
  (a, b) => a - b
);

let count = 0;
for (let i = 0; i < wordLength_values.length; i++) {
  let W = unique_words.filter(
    (s, k) => wordLengths[k] === wordLength_values[i]
  );
  count += W.length;
  writeArrayToFile(
    W,
    'tamillexicon_unique_words_of_length_' + wordLength_values[i] + '.txt'
  );
}

console.log('count:', count, 'original count:', unique_words.length);
