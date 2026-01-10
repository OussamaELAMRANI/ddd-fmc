import { User } from '../../domain/entity/user.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { InferSelectModel } from 'drizzle-orm';
import { usersTable } from '../database/schema/users.schema';

type UserPersistence = InferSelectModel<typeof usersTable>;

export class UserMapper {
  static toDomain(raw: UserPersistence): User {
    // Reconstitute the entity using Domain rules
    return new User(
      new UserId(raw.id),
      raw.name,
      new Email(raw.email),
      raw.createdAt,
      raw.updatedAt,
    );
  }

  static toPersistence(domainEntity: User): UserPersistence {
    return {
      id: domainEntity.getId().getValue(),
      name: domainEntity.getName(),
      password: domainEntity.getName(),
      email: domainEntity.getEmail().getValue(),
      createdAt: domainEntity.getCreatedAt(),
      updatedAt: domainEntity.getUpatedAt(),
    };
  }
}
