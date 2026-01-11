import { z } from 'zod';
import { ValueObject } from '@/shared/domain/value-object.base';

export class EventThumbnail extends ValueObject<string> {
  static readonly schema = z
    .url({
      protocol: /^(http|https)/,
      error: 'the url must be a valid thumbnail link',
    })
    .optional()
    .nullable();

  protected validate() {
    if (!EventThumbnail.schema.safeParse(this.value).success) {
      throw new Error('This is not a valid thumbnail link');
    }
  }
}
