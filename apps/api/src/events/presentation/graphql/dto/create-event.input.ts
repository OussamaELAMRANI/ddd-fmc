import { InputType, Field } from '@nestjs/graphql';
import { UrlLinkInput } from '@/events/presentation/graphql/dto/url-link.input';

@InputType()
export class CreateEventInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field({ nullable: true })
  description: string;

  @Field(() => UrlLinkInput, { nullable: true })
  externalLink?: UrlLinkInput;

  @Field({ nullable: true })
  thumbnail: string;

  @Field({ nullable: true })
  poster: string;

  @Field(() => Date)
  startedAt: Date;

  @Field(() => Date)
  endedAt: Date;

  @Field({ nullable: true })
  hasTicket: boolean;

  @Field({ nullable: true })
  hasLive: boolean;

  @Field({ nullable: true })
  isPublished: boolean;

  @Field({ nullable: true })
  address: string;

  @Field(() => Date, { nullable: true })
  notifiedAt: Date;
}
