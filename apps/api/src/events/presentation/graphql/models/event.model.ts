import { Field, Int, ObjectType } from '@nestjs/graphql';

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

  @Field()
  createdAt: Date;

  @Field()
  isPublished: boolean;
}
