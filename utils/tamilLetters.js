// const letterToPos = {};
const Letters = [
  [
    '\u0b85',
    '\u0b86',
    '\u0b87',
    '\u0b88',
    '\u0b89',
    '\u0b8a',
    '\u0b8e',
    '\u0b8f',
    '\u0b90',
    '\u0b92',
    '\u0b93',
    '\u0b94',
    '\u0b83',
  ],
  [
    '\u0b95',
    '\u0b95\u0bbe',
    '\u0b95\u0bbf',
    '\u0b95\u0bc0',
    '\u0b95\u0bc1',
    '\u0b95\u0bc2',
    '\u0bc6\u0b95',
    '\u0b95\u0bc7',
    '\u0b95\u0bc8',
    '\u0b95\u0bca',
    '\u0b95\u0bcb',
    '\u0b95\u0bcc',
    '\u0b95\u0bcd',
  ],
  [
    '\u0b99',
    '\u0b99\u0bbe',
    '\u0b99\u0bbf',
    '\u0b99\u0bc0',
    '\u0b99\u0bc1',
    '\u0b99\u0bc2',
    '\u0b99\u0bc6',
    '\u0b99\u0bc7',
    '\u0b99\u0bc8',
    '\u0b99\u0bca',
    '\u0b99\u0bcb',
    '\u0b99\u0bcc',
    '\u0b99\u0bcd',
  ],
  [
    '\u0b9a',
    '\u0b9a\u0bbe',
    '\u0b9a\u0bbf',
    '\u0b9a\u0bc0',
    '\u0b9a\u0bc1',
    '\u0b9a\u0bc2',
    '\u0b9a\u0bc6',
    '\u0b9a\u0bc7',
    '\u0b9a\u0bc8',
    '\u0b9a\u0bca',
    '\u0b9a\u0bcb',
    '\u0b9a\u0bcc',
    '\u0b9a\u0bcd',
  ],
  [
    '\u0b9e',
    '\u0b9e\u0bbe',
    '\u0b9e\u0bbf',
    '\u0b9e\u0bc0',
    '\u0b9e\u0bc1',
    '\u0b9e\u0bc2',
    '\u0b9e\u0bc6',
    '\u0b9e\u0bc7',
    '\u0b9e\u0bc8',
    '\u0b9e\u0bca',
    '\u0b9e\u0bcb',
    '\u0b9e\u0bcc',
    '\u0b9e\u0bcd',
  ],
  [
    '\u0b9f',
    '\u0b9f\u0bbe',
    '\u0b9f\u0bbf',
    '\u0b9f\u0bc0',
    '\u0b9f\u0bc1',
    '\u0b9f\u0bc2',
    '\u0b9f\u0bc6',
    '\u0b9f\u0bc7',
    '\u0b9f\u0bc8',
    '\u0b9f\u0bca',
    '\u0b9f\u0bcb',
    '\u0b9f\u0bcc',
    '\u0b9f\u0bcd',
  ],
  [
    '\u0ba3',
    '\u0ba3\u0bbe',
    '\u0ba3\u0bbf',
    '\u0ba3\u0bc0',
    '\u0ba3\u0bc1',
    '\u0ba3\u0bc2',
    '\u0ba3\u0bc6',
    '\u0ba3\u0bc7',
    '\u0ba3\u0bc8',
    '\u0ba3\u0bca',
    '\u0ba3\u0bcb',
    '\u0ba3\u0bcc',
    '\u0ba3\u0bcd',
  ],
  [
    '\u0ba4',
    '\u0ba4\u0bbe',
    '\u0ba4\u0bbf',
    '\u0ba4\u0bc0',
    '\u0ba4\u0bc1',
    '\u0ba4\u0bc2',
    '\u0ba4\u0bc6',
    '\u0ba4\u0bc7',
    '\u0ba4\u0bc8',
    '\u0ba4\u0bca',
    '\u0ba4\u0bcb',
    '\u0ba4\u0bcc',
    '\u0ba4\u0bcd',
  ],
  [
    '\u0ba8',
    '\u0ba8\u0bbe',
    '\u0ba8\u0bbf',
    '\u0ba8\u0bc0',
    '\u0ba8\u0bc1',
    '\u0ba8\u0bc2',
    '\u0ba8\u0bc6',
    '\u0ba8\u0bc7',
    '\u0ba8\u0bc8',
    '\u0ba8\u0bca',
    '\u0ba8\u0bcb',
    '\u0ba8\u0bcc',
    '\u0ba8\u0bcd',
  ],
  [
    '\u0baa',
    '\u0baa\u0bbe',
    '\u0baa\u0bbf',
    '\u0baa\u0bc0',
    '\u0baa\u0bc1',
    '\u0baa\u0bc2',
    '\u0baa\u0bc6',
    '\u0baa\u0bc7',
    '\u0baa\u0bc8',
    '\u0baa\u0bca',
    '\u0baa\u0bcb',
    '\u0baa\u0bcc',
    '\u0baa\u0bcd',
  ],
  [
    '\u0bae',
    '\u0bae\u0bbe',
    '\u0bae\u0bbf',
    '\u0bae\u0bc0',
    '\u0bae\u0bc1',
    '\u0bae\u0bc2',
    '\u0bae\u0bc6',
    '\u0bae\u0bc7',
    '\u0bae\u0bc8',
    '\u0bae\u0bca',
    '\u0bae\u0bcb',
    '\u0bae\u0bcc',
    '\u0bae\u0bcd',
  ],
  [
    '\u0baf',
    '\u0baf\u0bbe',
    '\u0baf\u0bbf',
    '\u0baf\u0bc0',
    '\u0baf\u0bc1',
    '\u0baf\u0bc2',
    '\u0baf\u0bc6',
    '\u0baf\u0bc7',
    '\u0baf\u0bc8',
    '\u0baf\u0bca',
    '\u0baf\u0bcb',
    '\u0baf\u0bcc',
    '\u0baf\u0bcd',
  ],
  [
    '\u0bb0',
    '\u0bb0\u0bbe',
    '\u0bb0\u0bbf',
    '\u0bb0\u0bc0',
    '\u0bb0\u0bc1',
    '\u0bb0\u0bc2',
    '\u0bb0\u0bc6',
    '\u0bb0\u0bc7',
    '\u0bb0\u0bc8',
    '\u0bb0\u0bca',
    '\u0bb0\u0bcb',
    '\u0bb0\u0bcc',
    '\u0bb0\u0bcd',
  ],
  [
    '\u0bb2',
    '\u0bb2\u0bbe',
    '\u0bb2\u0bbf',
    '\u0bb2\u0bc0',
    '\u0bb2\u0bc1',
    '\u0bb2\u0bc2',
    '\u0bb2\u0bc6',
    '\u0bb2\u0bc7',
    '\u0bb2\u0bc8',
    '\u0bb2\u0bca',
    '\u0bb2\u0bcb',
    '\u0bb2\u0bcc',
    '\u0bb2\u0bcd',
  ],
  [
    '\u0bb5',
    '\u0bb5\u0bbe',
    '\u0bb5\u0bbf',
    '\u0bb5\u0bc0',
    '\u0bb5\u0bc1',
    '\u0bb5\u0bc2',
    '\u0bb5\u0bc6',
    '\u0bb5\u0bc7',
    '\u0bb5\u0bc8',
    '\u0bb5\u0bca',
    '\u0bb5\u0bcb',
    '\u0bb5\u0bcc',
    '\u0bb5\u0bcd',
  ],
  [
    '\u0bb4',
    '\u0bb4\u0bbe',
    '\u0bb4\u0bbf',
    '\u0bb4\u0bc0',
    '\u0bb4\u0bc1',
    '\u0bb4\u0bc2',
    '\u0bb4\u0bc6',
    '\u0bb4\u0bc7',
    '\u0bb4\u0bc8',
    '\u0bb4\u0bca',
    '\u0bb4\u0bcb',
    '\u0bb4\u0bcc',
    '\u0bb4\u0bcd',
  ],
  [
    '\u0bb3',
    '\u0bb3\u0bbe',
    '\u0bb3\u0bbf',
    '\u0bb3\u0bc0',
    '\u0bb3\u0bc1',
    '\u0bb3\u0bc2',
    '\u0bb3\u0bc6',
    '\u0bb3\u0bc7',
    '\u0bb3\u0bc8',
    '\u0bb3\u0bca',
    '\u0bb3\u0bcb',
    '\u0bb3\u0bcc',
    '\u0bb3\u0bcd',
  ],
  [
    '\u0bb1',
    '\u0bb1\u0bbe',
    '\u0bb1\u0bbf',
    '\u0bb1\u0bc0',
    '\u0bb1\u0bc1',
    '\u0bb1\u0bc2',
    '\u0bb1\u0bc6',
    '\u0bb1\u0bc7',
    '\u0bb1\u0bc8',
    '\u0bb1\u0bca',
    '\u0bb1\u0bcb',
    '\u0bb1\u0bcc',
    '\u0bb1\u0bcd',
  ],
  [
    '\u0ba9',
    '\u0ba9\u0bbe',
    '\u0ba9\u0bbf',
    '\u0ba9\u0bc0',
    '\u0ba9\u0bc1',
    '\u0ba9\u0bc2',
    '\u0ba9\u0bc6',
    '\u0ba9\u0bc7',
    '\u0ba9\u0bc8',
    '\u0ba9\u0bca',
    '\u0ba9\u0bcb',
    '\u0ba9\u0bcc',
    '\u0ba9\u0bcd',
  ],
  [
    '\u0b9c',
    '\u0b9c\u0bbe',
    '\u0b9c\u0bbf',
    '\u0b9c\u0bc0',
    '\u0b9c\u0bc1',
    '\u0b9c\u0bc2',
    '\u0b9c\u0bc6',
    '\u0b9c\u0bc7',
    '\u0b9c\u0bc8',
    '\u0b9c\u0bca',
    '\u0b9c\u0bcb',
    '\u0b9c\u0bcc',
    '\u0b9c\u0bcd',
  ],
  [
    '\u0bb7',
    '\u0bb7\u0bbe',
    '\u0bb7\u0bbf',
    '\u0bb7\u0bc0',
    '\u0bb7\u0bc1',
    '\u0bb7\u0bc2',
    '\u0bb7\u0bc6',
    '\u0bb7\u0bc7',
    '\u0bb7\u0bc8',
    '\u0bb7\u0bca',
    '\u0bb7\u0bcb',
    '\u0bb7\u0bcc',
    '\u0bb7\u0bcd',
  ],
  [
    '\u0bb8',
    '\u0bb8\u0bbe',
    '\u0bb8\u0bbf',
    '\u0bb8\u0bc0',
    '\u0bb8\u0bc1',
    '\u0bb8\u0bc2',
    '\u0bb8\u0bc6',
    '\u0bb8\u0bc7',
    '\u0bb8\u0bc8',
    '\u0bb8\u0bca',
    '\u0bb8\u0bcb',
    '\u0bb8\u0bcc',
    '\u0bb8\u0bcd',
  ],
  [
    '\u0bb9',
    '\u0bb9\u0bbe',
    '\u0bb9\u0bbf',
    '\u0bb9\u0bc0',
    '\u0bb9\u0bc1',
    '\u0bb9\u0bc2',
    '\u0bb9\u0bc6',
    '\u0bb9\u0bc7',
    '\u0bb9\u0bc8',
    '\u0bb9\u0bca',
    '\u0bb9\u0bcb',
    '\u0bb9\u0bcc',
    '\u0bb9\u0bcd',
  ],
];

module.exports = {Letters};
// export function getLetterPos(letter) {
//     if(_.isEmpty(letterToPos)) {
//         for(let i=0; i<Letters.length; i++) {
//             for(let j=0; j<Letters[i].length; j++) {
//                 letterToPos[Letters[i][j]] = [i, j];
//             }
//         }
//     }
//
//     return letterToPos[letter];
// }
