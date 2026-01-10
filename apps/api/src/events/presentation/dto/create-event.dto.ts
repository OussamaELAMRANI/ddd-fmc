import { z } from 'zod';
import { insertEventSchema } from '@/events/infrastructure/database/schema/events.schema';
import {
  EventDescriptionVo,
  EventSubtitleVo,
  EventTitleVo,
} from '@/events/domain/value-objects';

export const createEventSchema = insertEventSchema
  .pick({
    title: true,
    subtitle: true,
    description: true,
  })
  .extend({
    title: EventTitleVo.schema,
    subtitle: EventSubtitleVo.schema,
    description: EventDescriptionVo.schema,
  });

export type CreateEventDto = z.infer<typeof createEventSchema>;
