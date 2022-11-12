const express = require('express');
const serverless = require('serverless-http');
const AWS = require('aws-sdk');
const app = express();
// const port = 3000;
const cors = require('cors');
const docClient = new AWS.DynamoDB.DocumentClient();

app.use(cors());

app.get('/', (req, res) => {
  console.log(req);
  res.send('Test /');
});

const gamesDataTableName = 'sollividu_games_data';

app.post('/postGameData', (req, res) => {
  console.log('req:', req);
  console.log('req.body:', req.body);
  console.log('JSON.parse(req.body):', JSON.parse(req.body));
  console.log('headers:', req.headers);
  const newData = JSON.parse(req.body);
  const uniqueId = newData.deviceUniqueId;
  docClient.put({TableName: gamesDataTableName, Item: newData});

  res.status(200).send('Success');
});

app.get('/getGameData/:deviceUniqueId', (req, res) => {
  docClient.get(
    {
      TableName: gamesDataTableName,
      Key: req.params.deviceUniqueId,
    },
    (err, data) => {
      res.send(data);
    }
  );
});

// app.listen(port, () => {
//   console.log(`Sollividu Backend listening on port ${port}`);
// });

module.exports.handler = serverless(app);
