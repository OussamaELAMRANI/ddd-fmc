import { AggregateRoot } from '@nestjs/cqrs';
import { EventModel } from '@/events/infrastructure/database/schema/events.schema';
import {
  EventDescriptionVo,
  EventIdVo,
  EventSubtitleVo,
  EventTitleVo,
  EventUrlLinkVo,
} from '@/events/domain/value-objects';
import { EventSlugVo } from '@/events/domain/value-objects/event-slug.vo';
import { EventThumbnail } from '@/events/domain/value-objects/event-thumbnail.vo';
import { EventPoster } from '@/events/domain/value-objects/event-poster.vo';
import { EventStartedAt } from '@/events/domain/value-objects/event-started-at.vo';
import { EventEndedAtVo } from '@/events/domain/value-objects/event-ended-at.vo';
import { EventHasTicket } from '@/events/domain/value-objects/event-has-ticket.vo';
import { EventHasLive } from '@/events/domain/value-objects/event-has-live.vo';
import { EventAddressVo } from '@/events/domain/value-objects/event-address.vo';

export class Event extends AggregateRoot {
  private constructor(
    private readonly _id: EventIdVo,
    private _slug: EventSlugVo,
    private _title: EventTitleVo,
    private _subtitle: EventSubtitleVo,
    private _description: EventDescriptionVo,
    private _url_link: EventUrlLinkVo,
    private _thumbnail: EventThumbnail,
    private _poster: EventPoster,
    private _startedAt: EventStartedAt,
    private _endedAt: EventEndedAtVo,
    private _hasTicket: EventHasTicket,
    private _hasLive: EventHasLive,
    private _address: EventAddressVo,
    private _isPublished: boolean,
  ) {
    super();
  }

  static create(props: EventModel): Event {
    const id = new EventIdVo(props.id);
    const title = new EventTitleVo(props.title);
    const slug = new EventSlugVo(props.slug);
    const subtitle = new EventSubtitleVo(props.subtitle);
    const description = new EventDescriptionVo(props.description);
    const url_link = new EventUrlLinkVo(props.url_link);
    const thumbnail = new EventThumbnail(props.thumbnail);
    const poster = new EventPoster(props.url_link);
    const startedAt = new EventStartedAt(props.startedAt);
    const endedAt = new EventEndedAtVo(props.endedAt);
    const hasTicket = new EventHasTicket(props.hasTicket);
    const hasLive = new EventHasLive(props.hasLive);
    const address = new EventAddressVo(props.address);

    return new Event(
      id,
      slug,
      title,
      subtitle || null,
      description,
      url_link,
      thumbnail,
      poster,
      startedAt,
      endedAt,
      hasTicket,
      hasLive,
      address,
      props.isPublished,
    );
  }

  // Reconstitute from Database (Used by Mapper)
  static restore(props: EventModel): Event {
    return new Event(
      new EventIdVo(props.id),
      new EventSlugVo(props.slug),
      new EventTitleVo(props.title),
      new EventSubtitleVo(props.subtitle),
      new EventDescriptionVo(props.description),
      new EventUrlLinkVo(props.url_link),
      new EventThumbnail(props.thumbnail),
      new EventPoster(props.poster),
      new EventStartedAt(props.startedAt),
      new EventEndedAtVo(props.endedAt),
      new EventHasTicket(props.hasTicket),
      new EventHasLive(props.hasLive),
      new EventAddressVo(props.address),
      props.isPublished,
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
  get url_link(): string | null {
    return this._url_link.getValue();
  }

  get thumbnail(): string | null {
    return this._thumbnail.getValue();
  }
  get poster(): string | null {
    return this._poster.getValue();
  }
  get startedAt(): Date {
    return this._startedAt.getValue();
  }
  get endedAt(): Date {
    return this._endedAt.getValue();
  }
  get hasLive(): boolean {
    return this._hasLive.getValue();
  }

  get hasTicket(): boolean {
    return this._hasTicket.getValue();
  }

  get isPublished(): boolean {
    return this._isPublished;
  }

  get address(): string {
    return this._address.getValue();
  }
}
