# Challenge 4

The goal of this challenge is to extend familiarity with creating GraphQL mutations by adding a user registration mutation using TypeGraphQL.

Task: Create a mutation for registering a new user that receives basic user properties and then adds the data to the database.  The user properties should include:
- firstName
- lastName
- email
- password

Steps
- Create a RegisterUserInput type with field validation.
- Create a new Resolver and Mutation for registering a new user using the properties listed above.

Notes
- The return data should include the basic user data, including the new user key.
- Password data should never be returned or displayed.
- Database functionality has been created for registering a user.
- Mutation functionality should be demonstratable within the Apollo Sandbox.
