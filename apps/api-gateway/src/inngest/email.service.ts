import { Injectable } from '@nestjs/common';
import nodemailer, { type Transporter } from 'nodemailer';

export type EmailMessage = {
  to: string;
  subject: string;
  text: string;
};

@Injectable()
export class EmailService {
  private transporter?: Transporter;

  private getTransporter(): Transporter | undefined {
    if (this.transporter) return this.transporter;
    const host = process.env.MAIL_HOST;
    const user = process.env.MAIL_USER;
    const password = process.env.MAIL_PASSWORD;
    if (!host || !user || !password) return undefined;
    this.transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.MAIL_PORT || 465),
      secure: process.env.MAIL_SECURE !== 'false',
      auth: { user, pass: password },
    });
    return this.transporter;
  }

  async send(message: EmailMessage): Promise<{ skipped: boolean }> {
    const transporter = this.getTransporter();
    if (!transporter) {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('MAIL_HOST, MAIL_USER and MAIL_PASSWORD are required');
      }
      // Local Inngest tests can run without a mail account. Do not print PII.
      return { skipped: true };
    }
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.MAIL_USER,
      to: message.to,
      subject: message.subject,
      text: message.text,
    });
    return { skipped: false };
  }
}
