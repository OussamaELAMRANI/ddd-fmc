import { AggregateRoot } from '@nestjs/cqrs';
import { EventModel } from '@/events/infrastructure/database/schema/events.schema';
import {
  EventDescriptionVo,
  EventIdVo,
  EventSubtitleVo,
  EventTitleVo,
} from '@/events/domain/value-objects';
import { EventSlugVo } from '@/events/domain/value-objects/event-slug.vo';

export class Event extends AggregateRoot {
  private constructor(
    private readonly _id: EventIdVo,
    private _slug: EventSlugVo,
    private _title: EventTitleVo,
    private _subtitle: EventSubtitleVo,
    private _description: EventDescriptionVo,
  ) {
    super();
  }

  static create(props: EventModel): Event {
    const id = new EventIdVo(props.id);
    const title = new EventTitleVo(props.title);
    const slug = new EventSlugVo(props.slug);
    const subtitle = new EventSubtitleVo(props.subtitle);
    const description = new EventDescriptionVo(props.description);

    return new Event(id, slug, title, subtitle || null, description);
  }

  // Reconstitute from Database (Used by Mapper)
  static restore(props: EventModel): Event {
    return new Event(
      new EventIdVo(props.id),
      new EventSlugVo(props.slug),
      new EventTitleVo(props.title),
      new EventSubtitleVo(props.subtitle),
      new EventDescriptionVo(props.description),
    );
  }

  get id(): number {
    return this._id.getValue();
  }

  get slug(): string {
    return this._slug.getValue();
  }

  get title(): string {
    return this._title.getValue();
  }

  get subtitle(): string | null {
    return this._subtitle.getValue();
  }

  get description(): string {
    return this._description.getValue();
  }
}
