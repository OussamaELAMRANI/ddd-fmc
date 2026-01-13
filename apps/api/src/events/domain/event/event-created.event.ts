import { Event } from '@/events/domain/entity/event.entity';

export class EventCreatedEvent {
  constructor(public readonly dto: Event) {}
}
