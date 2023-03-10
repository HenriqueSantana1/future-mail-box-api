import {Mail} from '@domain/entities/mail.entity';
import {Mail as RawMail} from '@prisma/client';

export class PrismaMailMapper {
  static toPrisma(mail: Mail) {
    return {
      id: mail.id,
      subject: mail.subject,
      content: mail.content,
      status: mail.status,
      userId: mail.userId,
      to: mail.to,
      sendAt: mail.sendAt,
      createdAt: mail.createdAt,
    };
  }

  static toDomain(raw: RawMail): Mail {
    return new Mail(
      {
        subject: raw.subject,
        content: raw.content,
        status: raw.status,
        userId: raw.userId,
        to: raw.to,
        sendAt: raw.sendAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
