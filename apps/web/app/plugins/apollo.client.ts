import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

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
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return {
    provide: {
      apolloClient,
    },
  };
});