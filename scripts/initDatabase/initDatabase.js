const Dynamo = require('@aws-sdk/client-dynamodb');
const phraseData = require('./seedData');
const uuid = require('uuid');

const userKey = 'u123';
const phrasesTableName = 'phrasetastic3';

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
  // console.log(phraseData);
  const ItemsArray = phraseData.map((element) => {
    console.log({ element });
    const requestItem = {
      PutRequest: {
        Item: {
          userKey: { S: userKey },
          phraseKey: { S: uuid.v4() },
          ...(element.author ? { author: { S: element.author } } : undefined),
          ...(element.source ? { source: { S: element.source } } : undefined),
          text: { S: element.text ?? '' },
          ...(element.tags ? { tags: { SS: element.tags } } : undefined),
          type: { S: element.type ?? 'quote' },
        },
      },
    };
    console.log(requestItem.PutRequest.Item);
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
