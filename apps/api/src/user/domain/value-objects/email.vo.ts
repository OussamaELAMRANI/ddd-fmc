import { ValueObject } from '@/shared/domain/value-object.base';
import { z } from 'zod';

export class Email extends ValueObject<string> {
  static readonly schema = z.email();

  protected validate(value: string) {
    if (!Email.schema.safeParse(value).success) {
      throw new Error('Email is not correct !');
    }
  }
}
