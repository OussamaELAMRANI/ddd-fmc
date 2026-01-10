import { ValueObject } from '@/shared/domain/value-object.base';
import { z } from 'zod';

export class EventSubtitleVo extends ValueObject<string> {
  static readonly schema = z.string().min(3).max(255).nullable();

  protected validate(value: string): void {
    if (!EventSubtitleVo.schema.safeParse(value).success)
      throw new Error('Subtitle must be null or between 3 and 255 chars');
  }
}
