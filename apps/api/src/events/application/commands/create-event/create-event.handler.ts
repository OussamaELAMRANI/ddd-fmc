import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateEventCommand } from './create-event.command';
import { EventRepositoryPort } from '@/events/application/ports/event.repository.port';
import { Event } from '@/events/domain/entity/event.entity';
import { SlugGeneratorService } from '@/events/domain/services/slug-generator.service';
import { EventCreatedEvent } from '@/events/domain/event/event-created.event';
import { EventModel } from '@/events/infrastructure/database/schema/events.schema';

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand> {
  constructor(
    private readonly repository: EventRepositoryPort,
    private readonly sluggable: SlugGeneratorService,
    private readonly publisher: EventPublisher,
  ) {}

  async execute({ dto }: CreateEventCommand): Promise<EventModel> {
    const slug = await this.sluggable.generate(dto.title);
    const event = Event.create({ ...dto, slug, id: 0 });
    const savedEvent = await this.repository.save(event);

    const eventModel = this.publisher.mergeObjectContext(savedEvent);
    eventModel.apply(new EventCreatedEvent(savedEvent));
    eventModel.commit();

    return savedEvent.toPrimitives();
  }
}
