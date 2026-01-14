import type { DocumentNode } from '@apollo/client';

export const useGraphQL = () => {
  const { $apolloClient } = useNuxtApp();

  const loading = ref(false);

  const query = async <T>(queryGql: DocumentNode, variables = {}) => {
    loading.value = true;
    try {
      const result = await $apolloClient.query({
        query: queryGql,
        variables,
      });
      return { data: result.data as T, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      loading.value = false;
    }
  };

  const mutate = async <T = any>(mutationGql: DocumentNode, variables = {}) => {
    loading.value = true;
    try {
      const result = await $apolloClient.mutate({
        mutation: mutationGql,
        variables,
      });
      return { data: result.data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      loading.value = false;
    }
  };

  return { query, mutate, loading };
};
