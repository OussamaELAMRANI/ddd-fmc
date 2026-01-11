import { z } from 'zod';
import { ValueObject } from '@/shared/domain/value-object.base';

export class EventHasLive extends ValueObject<boolean> {
  static readonly schema = z.boolean().default(false);

  protected validate() {
    if (!EventHasLive.schema.safeParse(this.value).success) {
      throw new Error('this is not a valid binary flag');
    }
  }
}
