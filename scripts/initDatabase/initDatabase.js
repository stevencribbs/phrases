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
const usersTableName = 'users';

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

const addBatchPhraseData = async () => {
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

const deletePhraseTable = async () => {
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

const createPhraseTable = async () => {
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

const deleteUserTable = async () => {
  const command = new DynamoDBClient.DeleteTableCommand({
    TableName: usersTableName,
  });
  console.log(`deleting table: ${usersTableName}`);
  try {
    const response = await client.send(command);
    console.log('table deleted');
    console.log(response);
    // return response;
  } catch (err) {
    if (err.message.includes('non-existent table')) {
      console.log(
        `Could not delete table. The table "${usersTableName}" does not exist.`
      );
    } else {
      console.log(err);
    }
  }
};

const createUserTable = async () => {
  // Info on syntax can be found in the API reference for CreateTable at https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html
  const command = new DynamoDBClient.CreateTableCommand({
    TableName: usersTableName,
    AttributeDefinitions: [
      {
        AttributeName: 'userKey',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'userKey',
        KeyType: 'HASH',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  });

  console.log(`creating table: ${usersTableName}`);
  try {
    const response = await client.send(command);
    console.log('table created');
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const addInitialUser = async () => {
  const ItemsArray = [
    {
      PutRequest: {
        Item: {
          userKey: 'u123',
          firstName: 'Larry',
          lastName: 'Cucumber',
          email: 'larry@cucumber.com',
          password: 'test',
        },
      },
    },
    {
      PutRequest: {
        Item: {
          userKey: 'u456',
          firstName: 'Bob',
          lastName: 'Tomato',
          email: 'bob@tomato.com',
          password: 'test',
        },
      },
    },
  ];
  console.log(ItemsArray);
  const command = new DynamoDBLib.BatchWriteCommand({
    RequestItems: {
      [usersTableName]: ItemsArray,
    },
  });

  console.log(`populating table ${usersTableName} with initial data set`);
  try {
    const response = await docClient.send(command);
    console.log('table populated');
    console.log('BatchWriteResponse: ' + response);
  } catch (err) {
    if (err.message.includes('non-existent table')) {
      console.log(
        `Could not populate table. The table "${TableName}" does not exist.`
      );
    } else {
      console.log('BatchWriteResponse: ' + err);
    }
  }
};

const main = async () => {
  if (process.argv.includes('-init')) {
    await deletePhraseTable();
    await createPhraseTable();
    await deleteUserTable();
    await createUserTable();
  } else {
    if (process.argv.includes('-d')) {
      await deletePhraseTable();
      await deleteUserTable();
    }
    if (process.argv.includes('-c')) {
      await createPhraseTable();
      await createUserTable();
    }
  }

  if (process.argv.includes('-p')) {
    await addBatchPhraseData();
    await addInitialUser();
  }
};

main();
