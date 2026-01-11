import { DateValueObject } from '@/events/domain/value-objects/DateValueObject';

export class EventEndedAtVo extends DateValueObject {
  message = 'Event end date must be valid format';
}
