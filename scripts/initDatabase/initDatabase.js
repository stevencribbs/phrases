const DynamoDBClient = require('@aws-sdk/client-dynamodb');
const phraseData = require('./seedData');
const uuid = require('uuid');
const DynamoDBLib = require('@aws-sdk/lib-dynamodb');
// import {
//   BatchWriteCommand,
//   DeleteCommand,
//   DynamoDBDocumentClient,
//   GetCommand,
//   PutCommand,
//   UpdateCommand,
//   paginateQuery,
//   paginateScan,
// } from '@aws-sdk/lib-dynamodb';

const userKey = 'u123';
const phrasesTableName = 'phrases';

// AWS.config.update({
//   region: 'local',
//   endpoint: 'http://localhost:8000',
//   accessKeyId: 'fakekey',
// });

// const clientConfig = new DynamoDBClientConfigType({ accesKeyId: 'fakekey' });
const client = new DynamoDBClient.DynamoDBClient({
  endpoint: 'http://localhost:8000',
  region: 'local',
  accesKeyId: 'fakekey',
});
const docClient = DynamoDBLib.DynamoDBDocumentClient.from(client);

const addBatchData = async () => {
  const ItemsArray = phraseData.map((element) => {
    element.userKey = userKey;
    element.phraseKey = uuid.v4();
    const requestItem = {
      PutRequest: {
        Item: element,
      },
    };
    return requestItem;
  });
  console.log(ItemsArray);
  const command = new DynamoDBLib.BatchWriteCommand({
    RequestItems: {
      [phrasesTableName]: ItemsArray,
    },
  });

  console.log(`populating table ${phrasesTableName} with initial data set`);
  try {
    const response = await docClient.send(command);
    console.log('table populated');
    console.log('BatchWriteResponse: ' + response);
  } catch (err) {
    if (err.message.includes('non-existent table')) {
      console.log(
        `Could not populate table. The table "${phrasesTableName}" does not exist.`
      );
    } else {
      console.log('BatchWriteResponse: ' + err);
    }
  }
};

const deleteTable = async () => {
  const command = new DynamoDBClient.DeleteTableCommand({
    TableName: phrasesTableName,
  });
  console.log(`deleting table: ${phrasesTableName}`);
  try {
    const response = await client.send(command);
    console.log('table deleted');
    console.log(response);
    // return response;
  } catch (err) {
    if (err.message.includes('non-existent table')) {
      console.log(
        `Could not delete table. The table "${phrasesTableName}" does not exist.`
      );
    } else {
      console.log(err);
    }
  }
};

const createTable = async () => {
  // Info on syntax can be found in the API reference for CreateTable at https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html
  const command = new DynamoDBClient.CreateTableCommand({
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
      {
        AttributeName: 'phraseType',
        AttributeType: 'S',
      },
    ],
    // GlobalSecondaryIndexes: [
    //   {
    //     IndexName: 'string',
    //     KeySchema: [
    //       {
    //         AttributeName: 'string',
    //         KeyType: 'string',
    //       },
    //     ],
    //     Projection: {
    //       NonKeyAttributes: ['string'],
    //       ProjectionType: 'string',
    //     },
    //     ProvisionedThroughput: {
    //       ReadCapacityUnits: number,
    //       WriteCapacityUnits: number,
    //     },
    //   },
    // ],
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
    LocalSecondaryIndexes: [
      {
        IndexName: 'phraseTypeIndex',
        KeySchema: [
          {
            AttributeName: 'userKey',
            KeyType: 'HASH',
          },
          {
            AttributeName: 'phraseType',
            KeyType: 'RANGE',
          },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  });

  console.log(`creating table: ${phrasesTableName}`);
  try {
    const response = await client.send(command);
    console.log('table created');
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const main = async () => {
  if (process.argv.includes('-init')) {
    await deleteTable();
    await createTable();
  } else {
    if (process.argv.includes('-d')) {
      await deleteTable();
    }
    if (process.argv.includes('-c')) {
      await createTable();
    }
  }

  if (process.argv.includes('-p')) {
    await addBatchData();
  }
};

main();
