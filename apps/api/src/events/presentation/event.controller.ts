import { Controller, Get, Post, Body, Query, UsePipes } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateEventCommand } from '@/events/application/commands/create-event/create-event.command';
import { GetEventsQuery } from '@/events/application/queries/get-events/get-events.query';
import {
  CreateEventDto,
  createEventSchema,
} from '@/events/presentation/dto/create-event.dto';
import { ZodValidationPipe } from '@/shared/pipes/zod-validation.pipe';

@Controller('events')
export class EventController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createEventSchema))
  async create(@Body() dto: CreateEventDto) {
    return this.commandBus.execute(new CreateEventCommand(dto));
  }

  @Get()
  async findAll(@Query('limit') limit: number) {
    return this.queryBus.execute(new GetEventsQuery(limit));
  }
}
