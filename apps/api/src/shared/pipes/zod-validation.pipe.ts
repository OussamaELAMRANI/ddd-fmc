import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';
import { CreateEventDto } from '@/events/presentation/dto/create-event.dto';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<CreateEventDto>) {}

  transform(value: CreateEventDto, metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);

    if (result.success) {
      return result.data;
    }

    const formattedErrors = result.error.issues.map((error) => ({
      path: error.path.join('.'),
      message: error.message,
    }));

    throw new BadRequestException({
      message: 'Validation Failed',
      errors: formattedErrors,
    });
  }
}
