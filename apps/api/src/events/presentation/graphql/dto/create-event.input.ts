import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {

  @Field()
  title: string;

  @Field({ nullable: true })
  subtitle?: string;

  @Field()
  description: string;
}
