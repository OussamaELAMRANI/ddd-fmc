import { EventStartedAt } from '@/events/domain/value-objects/event-started-at.vo';

export class EventEndedAtVo extends EventStartedAt {

  protected validate(value: Date): void {
    if (!EventEndedAtVo.schema.safeParse(value).success) {
      throw new Error('this is not a valid end date');
    }
  }
}
