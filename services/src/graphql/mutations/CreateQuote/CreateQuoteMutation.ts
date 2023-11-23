import { Arg, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';
import { DBService } from '../../../database/DBService';
import { Service } from 'typedi';
import { Quote } from '../../../database/models/Quotes';

@ObjectType('Quote')
export class QuoteOutput implements Partial<Quote> {
  @Field()
  public userKey: string;

  @Field()
  public quoteKey: string;

  @Field({ nullable: true })
  public author?: string;

  @Field({ nullable: true })
  public text?: string;

  @Field(() => [String], { nullable: true })
  public tags?: string[];

  @Field({ nullable: true })
  public reference?: string;
}

@InputType()
export class CreateQuoteInput {
  @Field()
  userKey: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  text?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  reference?: string;
}

@Service()
@Resolver()
export class CreateQuoteMutation {
  private dbService: DBService;

  constructor() {
    this.dbService = new DBService();
    // this.dbService.initializeQuotesDatabase();
    // this.dbService.addSeedData();
  }

  @Mutation(() => QuoteOutput)
  async createQuote(
    @Arg("quote", { validate: false }) {
      userKey,
      author,
      text,
      tags,
      reference
    }: CreateQuoteInput
  ): Promise<QuoteOutput> {
    console.log("in createQuote mutation")
    //TODO: userKey should come from context
    //try {
    const newQuote = await this.dbService.createQuote(
      userKey,
      author,
      text,
      tags,
      reference
    );
    return newQuote;
    // }
    // catch(error) {
    //   console.log({error});
    //   return;
    // }
  }
}