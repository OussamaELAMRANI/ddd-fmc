import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../../packages/graphql-contract/schema.graphql',
  documents: [
    'graphql/**/*.graphql',
    'composables/**/*.ts',
    'components/**/*.vue',
  ],
  generates: {
    './app/types/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        skipTypename: false,
        enumsAsTypes: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
