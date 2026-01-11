import { z } from 'zod';
import { ValueObject } from '@/shared/domain/value-object.base';

export class EventAddressVo extends ValueObject<string> {
  static readonly schema = z.string().optional()

  protected validate(value: string) {
    if (!EventAddressVo.schema.safeParse(value).success) {
      throw new Error('This is not a valid address');
    }
  }
}
