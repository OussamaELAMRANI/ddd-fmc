import { EventModel } from '@/events/infrastructure/database/schema/events.schema';
import { Event as EventEntity } from '@/events/domain/entity/event.entity';

export class EventMapper {
  static toDomain(raw: EventModel): EventEntity {
    return EventEntity.reconstitute({
      id: raw.id,
      slug: raw.slug,
      title: raw.title,
      subtitle: raw.subtitle,
      description: raw.description,
      externalLink: raw.externalLink,
      thumbnail: raw.thumbnail,
      poster: raw.poster,
      startedAt: raw.startedAt,
      endedAt: raw.endedAt,
      hasTicket: raw.hasTicket,
      hasLive: raw.hasLive,
      address: raw.address,
      isPublished: raw.isPublished,
      notifiedAt: raw.notifiedAt,
    });
  }

  static toPersistence(entity: EventEntity) {
    return {
      title: entity.title,
      slug: entity.slug,
      subtitle: entity.subtitle,
      description: entity.description,
      externalLink: entity.externalLink,
      thumbnail: entity.thumbnail,
      poster: entity.poster,
      startedAt: entity.startedAt,
      endedAt: entity.endedAt,
      hasLive: entity.hasLive,
      hasTicket: entity.hasTicket,
      address: entity.address,
      notifiedAt: entity.notifiedAt,
      isPublished: entity.isPublished,
    };
  }
}
