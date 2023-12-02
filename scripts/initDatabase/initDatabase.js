const Dynamo = require('@aws-sdk/client-dynamodb');
const phraseData = require('./seedData');
const uuid = require('uuid');

const userKey = 'u123';
const phrasesTableName = 'phrasetastic2';

// AWS.config.update({
//   region: 'local',
//   endpoint: 'http://localhost:8000',
//   accessKeyId: 'fakekey',
// });

const client = new Dynamo.DynamoDBClient({
  endpoint: 'http://localhost:8000',
  region: 'local',
  accesKeyId: 'fakekey',
});
// const clientConfig = new DynamoDBClientConfigType({ accesKeyId: 'fakekey' });

const addBatchData = async () => {
  const ItemsArray = phraseData.map((element) => {
    const requestItem = {
      PutRequest: {
        Item: {
          userKey: { S: userKey },
          phraseKey: { S: uuid.v4() },
          author: { S: element.author },
          text: { S: element.text },
          tags: { SS: element.tags },
        },
      },
    };
    return requestItem;
  });
  const command = new Dynamo.BatchWriteItemCommand({
    RequestItems: {
      [phrasesTableName]: ItemsArray,
    },
  });

  const response = await client.send(command);
  console.log('BatchWriteResponse: ' + response);
  return response;
};

const createTable = async () => {
  const command = new Dynamo.CreateTableCommand({
    TableName: phrasesTableName,
    AttributeDefinitions: [
      {
        AttributeName: 'userKey',
        AttributeType: 'S',
      },
      {
        AttributeName: 'phraseKey',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'userKey',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'phraseKey',
        KeyType: 'RANGE',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  });

  const response = await client.send(command);
  console.log(response);
  return response;
};

const main = async () => {
  console.log(process.argv);
  if (process.argv.includes('-i')) {
    await createTable();
  }

  if (process.argv.includes('-p')) {
    await addBatchData();
  }
};

main();
