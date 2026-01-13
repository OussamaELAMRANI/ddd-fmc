import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateEventCommand } from '@/events/application/commands/create-event/create-event.command';
import { EventCreatedEvent } from '@/events/domain/event/event-created.event';

@EventsHandler(EventCreatedEvent)
export class TypesenseEventHandler
  implements IEventHandler<CreateEventCommand>
{
  handle({ dto }: EventCreatedEvent): any {
    const event = dto;
    console.log(`🔍 Indexing Event:`);
    console.log({ event: event.toPrimitives() });
  }
}
