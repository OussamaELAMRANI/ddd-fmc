import { z } from 'zod';
import { ValueObject } from '@/shared/domain/value-object.base';

export class EventStartedAt extends ValueObject<Date> {

  protected validate(value: Date): void {
    if (!EventStartedAt.schema.safeParse(value).success) {
      throw new Error('this is not a valid start date');
    }
  }

  static readonly schema = z.coerce.date({
    error: 'the date format is invalid',
  });

}
