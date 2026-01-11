import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UrlLink {
  @Field()
  url: string;

  @Field({nullable: true})
  name: string;
}
