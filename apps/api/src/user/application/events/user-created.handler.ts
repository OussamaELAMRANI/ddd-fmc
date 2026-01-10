import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UserCreatedEvent } from '@/user/domain/events/user-created.event';
import {
  EMAIL_NOTIFICATION_SERVICE,
  EmailNotificationPort,
} from '@/user/application/ports/email-notification.port';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    @Inject(EMAIL_NOTIFICATION_SERVICE)
    private readonly emailService: EmailNotificationPort,
  ) {}

  async handle(event: UserCreatedEvent) {
    await this.emailService.sendActivationEmail(event.email, event.name);
  }
}
