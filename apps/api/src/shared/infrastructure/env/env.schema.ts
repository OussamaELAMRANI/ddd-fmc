import { z } from 'zod';

// 1. Define the Zod Schema
export const envSchema = z.object({
  // Database
  DATABASE_URL: z.url(),

  // App Configuration
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000), // 'coerce' automatically converts string "3000" to number 3000

  // Example: Feature Flags or API Keys
  JWT_SECRET: z.string().min(10),
  GRAPHQL_PLAYGROUND: z.coerce.boolean().default(false),
});

// 2. Export the Type (Power of Zod: automatic TypeScript interface)
export type EnvConfig = z.infer<typeof envSchema>;

// 3. Create the Validator Function for NestJS
export function validate(config: Record<string, unknown>) {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    console.error('❌ Invalid environment variables:', result.error.format());
    throw new Error('Invalid environment variables');
  }

  return result.data;
}
