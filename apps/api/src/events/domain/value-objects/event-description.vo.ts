import { ValueObject } from '@/shared/domain/value-object.base';
import { z } from 'zod';

export class EventDescriptionVo extends ValueObject<string> {
  static readonly schema = z.string().min(10).nullable();

  protected validate(value: string): void {
    if (!EventDescriptionVo.schema.safeParse(value).success)
      throw new Error('Description is too short');
  }
}
