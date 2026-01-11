import { DateValueObject } from '@/events/domain/value-objects/DateValueObject';

export class EventStartedAt extends DateValueObject {
  message = 'Event start date must be valid format';
}
