import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  url_link: string;

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
}
