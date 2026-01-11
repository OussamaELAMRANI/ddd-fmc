import { z } from 'zod';
import { ValueObject } from '@/shared/domain/value-object.base';
import { UrlLinkType } from '@/shared/database/custom-types/url-link.type';

export class EventExternalLinkVo extends ValueObject<UrlLinkType> {
  static readonly schema = z
    .object({
      url: z.url({
        error: 'the url must be a valid link address',
      })
      .regex(/^(https?|ftps?):\/\//, {
        message: 'URL must start with http, https, ftp, or ftps',
      }),
      name: z.string().nullable().optional(),
    })
    .nullable()
    .optional();

  protected validate() {
    if (!EventExternalLinkVo.schema.safeParse(this.value).success) {
      throw new Error('This is not a valid url link address');
    }
  }
}
