import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventModel } from './models/event.model';
import { CreateEventInput } from './dto/create-event.input'; // Import the new input
import { GetEventsQuery } from '@/events/application/queries/get-events/get-events.query';
import { CreateEventCommand } from '@/events/application/commands/create-event/create-event.command';
import { ZodValidationPipe } from '@/shared/pipes/zod-validation.pipe';
import { createEventSchema } from '@/events/presentation/dto/create-event.dto';
import { UseFilters } from '@nestjs/common';
import { GraphqlValidationFilter } from '@/shared/filters/graphql-validation.filter';

@UseFilters(GraphqlValidationFilter) // Apply filter here
@Resolver(() => EventModel)
export class EventResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [EventModel], { name: 'events' })
  async events(
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    @Args('offset', { type: () => Int, nullable: true }) offset?: number,
  ) {
    return this.queryBus.execute(new GetEventsQuery(limit, offset));
  }

  @Mutation(() => EventModel)
  async createEvent(
    @Args('input', new ZodValidationPipe(createEventSchema))
    input: CreateEventInput,
  ) {
    return this.commandBus.execute(new CreateEventCommand(input));
  }
}
