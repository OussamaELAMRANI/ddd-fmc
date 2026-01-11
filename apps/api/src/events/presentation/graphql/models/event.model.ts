import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EventModel {
  @Field(() => Int)
  id?: number;

  @Field()
  slug: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime)
  startedAt: Date;

  @Field(() => GraphQLISODateTime)
  endedAt: Date;

  @Field()
  hasLive: boolean;

  @Field()
  hasTicket: boolean;

  @Field()
  isPublished: boolean;

  @Field({ nullable: true })
  address: string;
}
