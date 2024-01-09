import { registerEnumType } from 'type-graphql';

export enum PhraseTypeEnum {
  FACT = 'FACT',
  QUOTE = 'QUOTE',
  VERSE = 'VERSE',
}

registerEnumType(PhraseTypeEnum, {
  name: 'PhraseTypeEnum', // Mandatory
  description: 'The types of phrases', // Optional
});
