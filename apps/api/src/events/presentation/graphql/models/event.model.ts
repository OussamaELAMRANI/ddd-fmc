import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { UrlLink } from '@/events/presentation/graphql/models/url-link.model';

@ObjectType()
export class EventModel {
  @Field(() => Int)
  id?: number;

  @Field()
  slug: string;

  @Field()
  title: string;

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
  address?: string;

  @Field(() => UrlLink, { nullable: true })
  externalLink?: UrlLink;

  @Field(() => GraphQLISODateTime, { nullable: true })
  notifiedAt: Date;
}
