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
      url_link: raw.url_link,
      thumbnail: raw.thumbnail,
      startedAt: raw.startedAt,
      endedAt: raw.endedAt,
      hasTicket: raw.hasTicket,
      hasLive: raw.hasLive,
      isPublished: raw.isPublished,
      address: raw.address,
    };
  }

  static toPersistence(entity: EventEntity) {
    return {
      title: entity.title,
      slug: entity.slug,
      subtitle: entity.subtitle,
      description: entity.description,
      url_link: entity.url_link,
      thumbnail: entity.thumbnail,
      startedAt: entity.startedAt,
      endedAt: entity.endedAt,
      hasLive: entity.hasLive,
      hasTicket: entity.hasTicket,
      isPublished: entity.isPublished ,
      address: entity.address,
    };
  }
}
