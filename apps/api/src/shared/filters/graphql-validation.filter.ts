import { Catch, BadRequestException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(BadRequestException)
export class GraphqlValidationFilter implements GqlExceptionFilter {
  catch(exception: BadRequestException) {
    const response = exception.getResponse() as any;

    return new GraphQLError('Validation Failed', {
      extensions: {
        code: 'BAD_REQUEST',
        errors: response.errors,
      },
    });
  }
}

export const GRAPHQL_ERROR_FILTER = Symbol('GRAPHQL_ERROR_FILTER');
