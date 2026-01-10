import { ValueObject } from '@/shared/domain/value-object.base';
import { z } from 'zod';

export class EventTitleVo extends ValueObject<string> {
  static readonly schema = z.string().min(3).max(255);

  protected validate(value: string): void {
    if (!EventTitleVo.schema.safeParse(value).success)
      throw new Error('Title must be between 3 and 255 chars');
  }
}
