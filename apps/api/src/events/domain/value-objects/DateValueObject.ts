import { ValueObject } from '@/shared/domain/value-object.base';
import { z } from 'zod';

export class DateValueObject extends ValueObject<Date> {
  public message: string;

  static readonly schema = z.coerce.date({
    error: 'the date format is invalid',
  });

  protected validate(value: Date): void {
    if (!DateValueObject.schema.safeParse(value).success) {
      throw new Error(this.message);
    }
  }
}
