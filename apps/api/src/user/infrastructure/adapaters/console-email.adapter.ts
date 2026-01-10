import { Injectable } from '@nestjs/common';
import { EmailNotificationPort } from '../../application/ports/email-notification.port';

@Injectable()
export class ConsoleEmailAdapter implements EmailNotificationPort {
  async sendActivationEmail(email: string, name: string) {
    console.log('[EMAIL] Sending Account Activated Email');
    console.log(`To: ${email}`);
    console.log(`Name: ${name}`);
  }
}
