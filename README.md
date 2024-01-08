# phrases

Phrases is a sample project providing a playground for working with GraphQL, TypeGraphQL, DynamoDB, and Dynamoose.

# Getting Started

## Setup DynamoDB
You will want to set up a local instance of DynamoDB.  This can be a local install or a docker-based container.  
The database should be accessible through the endpoint `http://localhost:8000`.  

## Initializing the Database
From the scripts directory, run the `initDatabase` script to create and/or populate the initial database.  
`node initDatabase/initDatabase.js -init -p`
- -init will initialize the table (delete the table if it exists; and, then create a new table)
- -c will create the table if it does not already exist
- -d will delete the table if it exists
- -p will populate the table with an initial set of data

### Validating the Database
The AWS CLI can be used to list the local tables and data within the tables
- to list the tables:  
`aws dynamodb list-tables --endpoint-url http://localhost:8000 --region local`
- to list data within a table:  
`aws dynamodb scan --table-name phrases --endpoint-url http://localhost:8000 --region local`


## Data Structure
The expected data structure for an individual phrase is:

```javascript
{
  userKey: string,  // hash key: unique identifier for users
  phraseKey: string,  // range key: unique identifier for phrases
  author: string,
  source: string,
  text: string,
  tags: string[],
  phraseType: string,  // enum: quote, fact, verse
}
```
