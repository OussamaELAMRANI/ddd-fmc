import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from '@apollo/client/errors';

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) => {
      console.error(`GraphQL error: ${message}`, {
        locations,
        path,
      });
    });
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) => {
      console.error(`Protocol error: ${message}`, {
        extensions,
      });
    });
  } else {
    console.error(`Network error: ${error}`);
  }
});

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const httpLink = new HttpLink({
    uri: config.public.graphqlEndpoint || 'http://localhost:8080/graphql',
    headers: {
      // Add auth headers here if needed
      // authorization: `Bearer ${token}`
    },
  });

  const apolloClient = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  });

  return {
    provide: {
      apolloClient,
    },
  };
});
