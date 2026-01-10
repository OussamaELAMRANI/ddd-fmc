import { CreateEventDto } from '@/events/presentation/dto/create-event.dto';

export class CreateEventCommand {
  constructor(public readonly dto: CreateEventDto) {}
}
