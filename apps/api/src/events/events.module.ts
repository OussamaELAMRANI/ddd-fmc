import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventController } from './presentation/event.controller';
import { EventResolver } from './presentation/graphql/event.resolver';
import { DrizzleEventRepository } from './infrastructure/adapters/drizzle-event.repository';
import { EventRepositoryPort } from './application/ports/event.repository.port';
import { CreateEventHandler } from '@/events/application/commands/create-event/create-event.handler';
import { GetEventsHandler } from '@/events/application/queries/get-events/get-events.handler';
import { SlugGeneratorService } from '@/events/domain/services/slug-generator.service';
import { TypesenseEventHandler } from '@/events/application/event/typesense.event.handler';

@Module({
  imports: [CqrsModule],
  controllers: [EventController],
  providers: [
    SlugGeneratorService,
    EventResolver,
    CreateEventHandler,
    GetEventsHandler,
    {
      provide: EventRepositoryPort,
      useClass: DrizzleEventRepository,
    },
    TypesenseEventHandler,
  ],
})
export class EventsModule {}
