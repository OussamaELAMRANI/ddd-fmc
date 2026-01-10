import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventModel } from './models/event.model';
import { CreateEventInput } from './dto/create-event.input'; // Import the new input
import { GetEventsQuery } from '@/events/application/queries/get-events/get-events.query';
import { CreateEventCommand } from '@/events/application/commands/create-event/create-event.command';

@Resolver(() => EventModel)
export class EventResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [EventModel], { name: 'events' })
  async events(
    @Args('limit', { nullable: true, type: () => Int }) limit?: number,
  ) {
    return this.queryBus.execute(new GetEventsQuery(limit ?? 10));
  }

  @Mutation(() => EventModel)
  async createEvent(@Args('input') input: CreateEventInput) {
    return this.commandBus.execute(new CreateEventCommand(input));
  }
}
