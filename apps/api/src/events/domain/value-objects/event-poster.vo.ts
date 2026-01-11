import { z } from 'zod';
import { ValueObject } from '@/shared/domain/value-object.base';

export class EventPoster extends ValueObject<string> {
  static readonly schema = z
    .url({
      protocol: /^(http|https)/,
      error: 'the url must be a valid poster link',
    })
    .optional()
    .nullable();

  protected validate() {
    if (!EventPoster.schema.safeParse(this.value).success) {
      throw new Error('This is not a valid poster link');
    }
  }
}
