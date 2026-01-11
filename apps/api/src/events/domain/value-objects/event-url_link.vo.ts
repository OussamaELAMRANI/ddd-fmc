
import {z,ZodURL} from 'zod'
import { ValueObject } from '@/shared/domain/value-object.base';

export class EventUrlLinkVo extends ValueObject<string> {
  static readonly schema = z.url({
    protocol: /^(http|https)/,
    error:"the url must be a valid link address"
  }).optional().nullable()

 protected validate() {
   if (!EventUrlLinkVo.schema.safeParse(this.value).success) {
     throw new Error('This is not a valid url link address');
   }
  }
}





