import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { EnvConfig } from '../infrastructure/env/env.schema'; // Import the inferred type

export const DRIZZLE = Symbol('DRIZZLE_CONNECTION');

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      // Inject ConfigService with the generic EnvConfig type
      useFactory: async (configService: ConfigService<EnvConfig, true>) => {
        // TypeScript now knows that 'DATABASE_URL' exists and is a string
        const connectionString = configService.get('DATABASE_URL', {
          infer: true,
        });

        const pool = new Pool({ connectionString });
        return drizzle(pool);
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}
