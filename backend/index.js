const express = require('express');
const serverless = require('serverless-http');
const app = express();
// const port = 3000;
const cors = require('cors');
app.use(cors());
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   );
//   res.header(
//     'Access-Control-Allow-Headers',
//     'x-access-token, Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

app.get('/', (req, res) => {
  console.log(req);
  res.send('Test /');
});

app.post('/postGameData', (req, res) => {
  console.log('body:', req.body);
  console.log('headers:', req.headers);
  res.send('Hello World!');
});

app.get('/test', (req, res) => {
  console.log('req:', req);
  res.send('Test success');
});

// app.listen(port, () => {
//   console.log(`Sollividu Backend listening on port ${port}`);
// });

module.exports.handler = serverless(app);
