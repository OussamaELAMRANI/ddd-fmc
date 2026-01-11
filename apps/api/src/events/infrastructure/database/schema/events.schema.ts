import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export const eventsTable = pgTable('events', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }),
  subtitle: varchar('subtitle', { length: 255 }),
  description: text('description'),
  url_link: text('url'),
  thumbnail: varchar('thumbnail', { length: 255 }),

  poster: varchar('poster', { length: 255 }),
  urlPdf: text('url_pdf'),
  address: text('address'),

  startedAt: timestamp('started_at').notNull(),
  endedAt: timestamp('ended_at').notNull(),

  hasTicket: boolean('has_ticket').default(false),
  isPublished: boolean('is_published').default(false),
  notify: boolean('notify').default(false),
  notifiedAt: timestamp('notifiedAt'),
  hasLive: boolean('has_live').default(false),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'), // Soft delete
});

export type EventModel = InferInsertModel<typeof eventsTable>;
export type EventType = InferSelectModel<typeof eventsTable>;

export const insertEventSchema = createInsertSchema(eventsTable);
