import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    // Only validate the body
    if (metadata.type !== 'body') return value;

    const result = this.schema.safeParse(value);

    if (!result.success) {
      // Throw 400 Bad Request with readable error messages
      throw new BadRequestException(result.error.message);
    }

    return result.data;
  }
}
