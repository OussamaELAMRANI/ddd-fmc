import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetEventsQuery } from './get-events.query';
import { EventRepositoryPort } from '@/events/application/ports/event.repository.port';

@QueryHandler(GetEventsQuery)
export class GetEventsHandler implements IQueryHandler<GetEventsQuery> {
  constructor(private readonly repository: EventRepositoryPort) {}

  async execute(query: GetEventsQuery) {
    // Use repository pattern to maintain DDD boundaries
    return this.repository.findAll(query.limit, query.offset);
  }
}
