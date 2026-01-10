import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEventCommand } from './create-event.command';
import { EventRepositoryPort } from '@/events/application/ports/event.repository.port';
import { Event } from '@/events/domain/entity/event.entity';
import { SlugGeneratorService } from '@/events/domain/services/slug-generator.service';
import { EventType } from '@/events/infrastructure/database/schema/events.schema';

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand> {

  constructor(
    private readonly repository: EventRepositoryPort,
    private readonly sluggable: SlugGeneratorService,
  ) {}

  async execute({dto}: CreateEventCommand): Promise<EventType> {
    const slug = await this.sluggable.generate(dto.title);
    const event = Event.create({ id: 0, ...dto, slug });

    return await this.repository.save(event);
  }
}
