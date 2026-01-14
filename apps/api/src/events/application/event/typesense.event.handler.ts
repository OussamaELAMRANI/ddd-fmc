import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventCreatedEvent } from '@/events/domain/event/event-created.event';

@EventsHandler(EventCreatedEvent)
export class TypesenseEventHandler
  implements IEventHandler<EventCreatedEvent>
{
  handle({ dto }: EventCreatedEvent): any {
    const event = dto;
    console.log(`🔍 Indexing Event:`);
    console.log({ event: event.toPrimitives() });
  }
}
