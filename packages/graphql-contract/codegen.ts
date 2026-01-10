import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './schema/*.graphql',
  generates: {
    './src/generated.ts': {
      plugins: ['typescript', 'typescript-resolvers'], // Generate TS Types & Resolver Interfaces
      config: {
        useIndexSignature: true,
        // Optional: Map your internal DDD Entities to GraphQL Types to ensure safety
        mappers: {
          Event:
            '../../apps/api/src/events/domain/entity/event.entity#EventEntity',
        },
      },
    },
  },
};
export default config;
