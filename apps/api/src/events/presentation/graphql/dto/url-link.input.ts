import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UrlLinkInput {
  @Field()
  url: string;

  @Field({nullable: true})
  name: string;
}
