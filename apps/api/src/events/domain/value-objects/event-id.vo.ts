import { ValueObject } from '@/shared/domain/value-object.base';
import {z} from 'zod'

export class EventIdVo extends ValueObject<number> {
  static readonly schema = z.number().nullable();

  protected validate(value: number): void {
    if (!EventIdVo.schema.safeParse(value).success)
      throw new Error('EventId must be a number');
  }
}