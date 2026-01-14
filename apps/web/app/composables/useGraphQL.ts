import type { DocumentNode, OperationVariables } from '@apollo/client';
import type { ErrorLike } from '@apollo/client';
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from '@apollo/client/errors';

export const useGraphQL = () => {
  const { $apolloClient } = useNuxtApp();
  const loading = ref(false);
  const error = ref<ErrorLike | null>(null);

  /**
   * Extract error message from Apollo error
   */
  const getErrorMessage = (err: unknown): string => {
    if (err instanceof Error) {
      if (CombinedGraphQLErrors.is(err)) {
        return err.errors.map((e) => e.message).join(', ');
      }
      if (CombinedProtocolErrors.is(err)) {
        return err.errors.map((e) => e.message).join(', ');
      }
      return err.message;
    }
    return 'An unknown error occurred';
  };

  /**
   * Log error to console and potentially error tracking service
   */
  const handleError = (err: unknown, operation: 'query' | 'mutation') => {
    const errorLike = err as ErrorLike;
    error.value = errorLike;

    // Extract detailed error information
    const errorMessage = getErrorMessage(err);
    const errorDetails: Record<string, any> = {
      message: errorMessage,
      operation,
    };

    if (CombinedGraphQLErrors.is(err)) {
      errorDetails.graphQLErrors = err.errors;
    }
    if (CombinedProtocolErrors.is(err)) {
      errorDetails.protocolErrors = err.errors;
    }
    if (err instanceof Error && 'networkError' in err) {
      errorDetails.networkError = (err as any).networkError;
    }

    // Log to console in development
    if (process.dev) {
      console.error(`[GraphQL ${operation} error]:`, errorDetails);
    }

    // TODO: Send to error tracking service (e.g., Sentry, LogRocket)
    // if (process.client) {
    //   errorTrackingService.captureException(err, { extra: errorDetails });
    // }
  };

  const query = async <
    TData = any,
    TVariables extends OperationVariables = OperationVariables,
  >(
    queryGql: DocumentNode,
    variables?: TVariables,
    options?: Record<string, any>,
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const result = await $apolloClient.query<TData, TVariables>({
        query: queryGql,
        ...(variables && { variables }),
        ...options,
      } as any);

      return { data: result.data, error: null };
    } catch (err) {
      handleError(err, 'query');
      return { data: null, error: err as ErrorLike };
    } finally {
      loading.value = false;
    }
  };

  const mutate = async <
    TData = any,
    TVariables extends OperationVariables = OperationVariables,
  >(
    mutationGql: DocumentNode,
    variables?: TVariables,
    options?: Record<string, any>,
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const result = await $apolloClient.mutate<TData, TVariables>({
        mutation: mutationGql,
        ...(variables && { variables }),
        ...options,
      } as any);

      return { data: result.data, error: null };
    } catch (err) {
      handleError(err, 'mutation');
      return { data: null, error: err as ErrorLike };
    } finally {
      loading.value = false;
    }
  };

  return { query, mutate, loading, error };
};
