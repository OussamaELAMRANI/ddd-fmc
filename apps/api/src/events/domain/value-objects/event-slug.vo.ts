import { ValueObject } from '@/shared/domain/value-object.base';
import { z } from 'zod';
import slugify from 'slugify';

export class EventSlugVo extends ValueObject<string> {
  static readonly schema = z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format');

  protected validate(value: string): void {
    const result = EventSlugVo.schema.safeParse(value);
    if (!result.success) throw new Error(`[ERR]: ${result.error.message} [VAL]: ${value}`);
  }

  static slugFromTitle(title: string): EventSlugVo {
    const rawSlug = slugify(title, { lower: true, strict: true, trim: true });
    return new EventSlugVo(rawSlug);
  }
}
