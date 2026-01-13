import { Event } from '@/events/domain/entity/event.entity';
import { EventType } from '@/events/infrastructure/database/schema/events.schema';

export abstract class EventRepositoryPort {
  abstract save(event: Event): Promise<Event>; // Return entity with ID
  abstract findById(id: number): Promise<EventType | null>;
  abstract findBySlug(slug: string): Promise<EventType | null>;
  abstract findLastSlug(slug: string): Promise<{ slug: string } | null>;
  abstract delete(id: number): Promise<void>;
}
