import { EventModel } from '@/events/infrastructure/database/schema/events.schema';
import { Event as EventEntity } from '@/events/domain/entity/event.entity';

export class EventMapper {
  static toDomain(raw: EventModel) {
    return {
      id: raw.id,
      title: raw.title,
      slug: raw.slug,
      subtitle: raw.subtitle,
      description: raw.description,
    };
  }

  static toPersistence(entity: EventEntity) {
    return {
      title: entity.title,
      slug: entity.slug,
      subtitle: entity.subtitle,
      description: entity.description,
      // createdAt: entity.createdAt,
      updatedAt: new Date(), // Update timestamp on save
    };
  }
}
