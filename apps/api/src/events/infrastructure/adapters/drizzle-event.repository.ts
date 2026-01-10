import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { desc, eq, or, sql } from 'drizzle-orm';
import { EventRepositoryPort } from '@/events/application/ports/event.repository.port';
import { Event } from '@/events/domain/entity/event.entity';
import {
  eventsTable,
  EventType,
} from '@/events/infrastructure/database/schema/events.schema';
import { DRIZZLE } from '@/shared/database/database.module';
import { EventMapper } from '@/events/infrastructure/mappers/event.mapper';

@Injectable()
export class DrizzleEventRepository implements EventRepositoryPort {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase) {}

  async findLastSlug(slug: string): Promise<{ slug: string } | null> {
    const regexPattern = `^${slug}-\\d+$`;
    const [lastEventSlug] = await this.db
      .select({ slug: eventsTable.slug })
      .from(eventsTable)
      .where(
        or(
          eq(eventsTable.slug, slug),
          sql`${eventsTable.slug} ~ ${regexPattern}`,
        ),
      )
      .orderBy(
        desc(
          sql`COALESCE(SUBSTRING(${eventsTable.slug} FROM '\\d+$')::INTEGER, 0)`,
        ),
      )
      .limit(1);

    return lastEventSlug;
  }

  async findBySlug(slug: string): Promise<EventType | null> {
    const result = await this.db
      .select()
      .from(eventsTable)
      .where(eq(eventsTable.slug, slug));

    return result[0] || null;
  }

  async save(event: Event): Promise<any> {
    const raw = EventMapper.toPersistence(event);

    const result = await this.db
      .insert(eventsTable)
      .values(raw)
      .onConflictDoUpdate({ target: eventsTable.id, set: raw as any })
      .returning();

    return EventMapper.toDomain(result[0]);
  }

  async findById(id: number): Promise<EventType | null> {
    const result = await this.db
      .select()
      .from(eventsTable)
      .where(eq(eventsTable.id, id));

    return result[0] || null;
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(eventsTable).where(eq(eventsTable.id, id));
  }
}
