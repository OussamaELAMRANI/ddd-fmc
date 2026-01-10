import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from '@/user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@/shared/database/database.module';
import { validate } from '@/shared/infrastructure/env/env.schema';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'; // <--- Import here
import { join } from "path";
import { EventsModule } from '@/events/events.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate, // Validates .env on startup
      envFilePath: '.env',
    }),
    CqrsModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // TARGET: Write the schema directly to the packages folder
      autoSchemaFile: join(
        process.cwd(),
        '../../packages/graphql-contract/schema.graphql',
      ),
      sortSchema: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp', // Good practice for consistent dates
      },
      playground: false,
      csrfPrevention: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    DatabaseModule,
    UserModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
