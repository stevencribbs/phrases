# Challenge 2

The goal of this challenge is to gain familiarity with GraphQL mutations by adding update and delete mutations using TypeGraphQL.

Task: Create two new mutations.  The first mutation should be to update an existing phrase.  The mutation should allow for updating all the properties of a phrase; and, update properties should be optional - meaning that a property of the phrase does not have to be updated and, that by leaving the property out, it's saved value will not be overwritten or removed.  The mutation should take parameters for the userKey, the phraseKey, and phrase properties that should be updated.

The second mutation should be to delete an existing phrase from the database.  The mutation should take parameters for the userKey and the phraseKey.

Notes
- Mutations should include validation for all input field parameters.
- The functions for updating the database are stubbed out, but not fully implemented, in the `database/DBService.ts` file.
- Mutatoin functionality should be demonstratable within the Apollo Sandbox.
