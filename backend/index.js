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
  if (newData.app_id === 'BCB9C644-3F19-4BA1-B2C8-39B2463EBDE3') {
    docClient.put(
      {TableName: gamesDataTableName, Item: newData},
      (err, data) => {
        if (err) {
          console.log('Error writing to DynamoDB:', err);
          res.status(500).send('Failure');
        } else {
          console.log('Wrote data to table:', data);
          res.status(200).send('Success');
        }
      }
    );
  }
});

app.get('/getGameData/:deviceUniqueId', (req, res) => {
  if (req.headers.app_id === 'BCB9C644-3F19-4BA1-B2C8-39B2463EBDE3') {
    docClient.get(
      {
        TableName: gamesDataTableName,
        Key: {deviceUniqueId: req.params.deviceUniqueId},
      },
      (err, data) => {
        if (err) {
          console.log('error:', err);
          res.status(500).send('Failure');
        } else {
          console.log('fetched item from db:', data);
          res.status(200).send(data);
        }
      }
    );
  }
});

// app.listen(port, () => {
//   console.log(`Sollividu Backend listening on port ${port}`);
// });

module.exports.handler = serverless(app);
