import { z } from 'zod';
import { ValueObject } from '@/shared/domain/value-object.base';

export class EventNotifiedAtVo extends ValueObject<Date> {
  static schema = z.coerce
    .date({
      error: 'the date format is invalid',
    })
    .optional()
    .nullable();

  protected validate(value: Date): void {
    if (!EventNotifiedAtVo.schema.safeParse(value).success) {
      throw new Error('the notify date format is invalid');
    }
  }
}
