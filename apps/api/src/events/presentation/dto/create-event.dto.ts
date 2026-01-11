import { z } from 'zod';
import { insertEventSchema } from '@/events/infrastructure/database/schema/events.schema';
import {
  EventDescriptionVo,
  EventSubtitleVo,
  EventTitleVo,
  EventUrlLinkVo,
} from '@/events/domain/value-objects';
import { EventThumbnail } from '@/events/domain/value-objects/event-thumbnail.vo';
import { EventPoster } from '@/events/domain/value-objects/event-poster.vo';
import { EventStartedAt } from '@/events/domain/value-objects/event-started-at.vo';
import { EventEndedAtVo } from '@/events/domain/value-objects/event-ended-at.vo';
import { EventHasTicket } from '@/events/domain/value-objects/event-has-ticket.vo';
import { EventHasLive } from '@/events/domain/value-objects/event-has-live.vo';

export const createEventSchema = insertEventSchema
  .pick({
    title: true,
    subtitle: true,
    description: true,
    url_link: true,
    thumbnail: true,
    poster: true,
    startedAt: true,
    endedAt: true,
    hasLive: true,
    hasTicket: true,
    isPublished: true,
  })
  .extend({
    title: EventTitleVo.schema,
    subtitle: EventSubtitleVo.schema,
    description: EventDescriptionVo.schema,
    url_link: EventUrlLinkVo.schema,
    thumbnail: EventThumbnail.schema,
    poster: EventPoster.schema,
    startedAt: EventStartedAt.schema,
    endedAt: EventEndedAtVo.schema,
    hasTicket: EventHasTicket.schema,
    hasLive: EventHasLive.schema,
    isPublished: z
      .boolean()
      .optional()
  })
  .refine((data) => data.startedAt <= data.endedAt, {
    message: 'StartedAt must be before EndedAt',
    path: ['endedAt'],
  });

export type CreateEventDto = z.infer<typeof createEventSchema>;
