import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '@/shared/database/database.module';
import { GetEventsQuery } from './get-events.query';
import { eventsTable } from '@/events/infrastructure/database/schema/events.schema';

@QueryHandler(GetEventsQuery)
export class GetEventsHandler implements IQueryHandler<GetEventsQuery> {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase) {}

  async execute(query: GetEventsQuery) {
    // Direct Drizzle access for performance
    return this.db
      .select()
      .from(eventsTable)
      // .limit(query.limit)
      // .offset(query.offset);
  }
}
