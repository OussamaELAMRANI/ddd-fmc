import { EventSlugVo } from '@/events/domain/value-objects/event-slug.vo';
import { EventRepositoryPort } from '@/events/application/ports/event.repository.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SlugGeneratorService {
  constructor(private readonly repo: EventRepositoryPort) {}

  async generate(title: string) {
    const baseSlug = EventSlugVo.slugFromTitle(title);

    const lastSlugEvent = await this.repo.findLastSlug(baseSlug.getValue());

    if (!lastSlugEvent) {
      return baseSlug.getValue();
    }

    const lastSlug = lastSlugEvent.slug;
    const match = lastSlug.match(/-(\d+)$/);

    const lastCount = match ? parseInt(match[1], 10) : 0;

    return `${baseSlug.getValue()}-${lastCount + 1}`;
  }
}
