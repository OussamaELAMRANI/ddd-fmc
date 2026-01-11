import { AggregateRoot } from '@nestjs/cqrs';
import { EventModel } from '@/events/infrastructure/database/schema/events.schema';
import {
  EventDescriptionVo,
  EventIdVo,
  EventSubtitleVo,
  EventTitleVo,
  EventExternalLinkVo,
} from '@/events/domain/value-objects';
import { EventSlugVo } from '@/events/domain/value-objects/event-slug.vo';
import { EventThumbnail } from '@/events/domain/value-objects/event-thumbnail.vo';
import { EventPoster } from '@/events/domain/value-objects/event-poster.vo';
import { EventStartedAt } from '@/events/domain/value-objects/event-started-at.vo';
import { EventEndedAtVo } from '@/events/domain/value-objects/event-ended-at.vo';
import { EventHasTicket } from '@/events/domain/value-objects/event-has-ticket.vo';
import { EventHasLive } from '@/events/domain/value-objects/event-has-live.vo';
import { EventAddressVo } from '@/events/domain/value-objects/event-address.vo';
import { UrlLinkType } from '@/shared/database/custom-types/url-link.type';
import { EventNotifiedAtVo } from '@/events/domain/value-objects/event-notified-at.vo';

export class Event extends AggregateRoot {
  private constructor(
    private readonly _id: EventIdVo,
    private _slug: EventSlugVo,
    private _title: EventTitleVo,
    private _subtitle: EventSubtitleVo,
    private _description: EventDescriptionVo,
    private _external_link: EventExternalLinkVo,
    private _thumbnail: EventThumbnail,
    private _poster: EventPoster,
    private _startedAt: EventStartedAt,
    private _endedAt: EventEndedAtVo,
    private _hasTicket: EventHasTicket,
    private _hasLive: EventHasLive,
    private _address: EventAddressVo,
    private _isPublished: boolean,
    private _notifiedAt: EventNotifiedAtVo,
  ) {
    super();
  }

  static create(props: EventModel): Event {
    const id = new EventIdVo(props.id);
    const title = new EventTitleVo(props.title);
    const slug = new EventSlugVo(props.slug);
    const subtitle = new EventSubtitleVo(props.subtitle);
    const description = new EventDescriptionVo(props.description);
    const external_link = new EventExternalLinkVo(props.externalLink);
    const thumbnail = new EventThumbnail(props.thumbnail);
    const poster = new EventPoster(props.poster);
    const startedAt = new EventStartedAt(props.startedAt);
    const endedAt = new EventEndedAtVo(props.endedAt);
    const hasTicket = new EventHasTicket(props.hasTicket);
    const hasLive = new EventHasLive(props.hasLive);
    const address = new EventAddressVo(props.address);
    const notifiedAt = new EventNotifiedAtVo(props.notifiedAt);

    return new Event(
      id,
      slug,
      title,
      subtitle || null,
      description,
      external_link,
      thumbnail,
      poster,
      startedAt,
      endedAt,
      hasTicket,
      hasLive,
      address,
      props.isPublished,
      notifiedAt,
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

  get externalLink(): UrlLinkType {
    return this._external_link.getValue();
  }

  get notifiedAt(): Date {
    return this._notifiedAt.getValue();
  }
}
