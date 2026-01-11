import { jsonb } from 'drizzle-orm/pg-core';

export type UrlLinkType = {
  url: string;
  name?: string;
};

export const urlLink = (name: string) => {
  return jsonb(name).$type<UrlLinkType>();
};