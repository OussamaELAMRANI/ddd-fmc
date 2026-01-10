import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from './application/ports/user.repository.port';
import { InMemoryUserRepository } from './infrastructure/adapaters/in-memory-user.repository';
import { UserController } from './presentation/user.controller';
import { CommandHandlers } from './application/commands';
import { QueryHandlers } from './application/queries';
import { EMAIL_NOTIFICATION_SERVICE } from './application/ports/email-notification.port';
import { ConsoleEmailAdapter } from './infrastructure/adapaters/console-email.adapter';
import { EventHandlers } from './application/events';
import { DrizzleUserRepository } from '@/user/infrastructure/adapaters/drizzle-user.repository';
import { DatabaseModule } from '@/shared/database/database.module';

@Module({
  imports: [DatabaseModule], // Import your DB connection module
  controllers: [UserController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    // {
    //   provide: USER_REPOSITORY,
    //   useClass: InMemoryUserRepository,
    // },
    {
      provide: EMAIL_NOTIFICATION_SERVICE,
      useClass: ConsoleEmailAdapter,
    },
    {
      provide: USER_REPOSITORY,
      useClass: DrizzleUserRepository,
    },
  ],
})
export class UserModule {}
