const Dynamo = require('@aws-sdk/client-dynamodb');
// import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
// import { DynamoDBClientConfigType } from '@smithy/types';

// const clientConfig = new DynamoDBClientConfigType({ accesKeyId: 'fakekey' });

const main = async () => {
  const client = new Dynamo.DynamoDBClient({
    endpoint: 'http://localhost:8000',
    region: 'local',
    accesKeyId: 'fakekey',
  });
  const command = new Dynamo.CreateTableCommand({
    TableName: 'Scranton2',
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

main();

// AWS.config.update({
//   region: 'local',
//   endpoint: 'http://localhost:8000',
// });
// var dynamodb = new AWS.DynamoDB();
// var params = {
//   TableName: 'Scranton',
//   KeySchema: [
//     { AttributeName: 'userKey', KeyType: 'HASH' }, //Partition key
//     { AttributeName: 'phraseKey', KeyType: 'RANGE' }, //Sort key
//   ],
//   AttributeDefinitions: [{ AttributeName: 'userKey', AttributeType: 'S' }],
//   AttributeDefinitions: [{ AttributeName: 'phraseKey', AttributeType: 'S' }],
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 5,
//     WriteCapacityUnits: 5,
//   },
// };
// dynamodb.createTable(params, function (err, data) {
//   if (err) {
//     console.error('Error JSON.', JSON.stringify(err, null, 2));
//   } else {
//     console.log('Created table.', JSON.stringify(data, null, 2));
//   }
// });
