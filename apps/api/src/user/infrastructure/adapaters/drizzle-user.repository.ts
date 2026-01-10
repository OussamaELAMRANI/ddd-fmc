import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

import { User } from '../../domain/entity/user.entity';
import { usersTable } from '../database/schema/users.schema';
import { DRIZZLE } from '@/shared/database/database.module';
import { UserRepositoryPort } from '@/user/application/ports/user.repository.port';
import { UserMapper } from '@/user/infrastructure/mappers/user.mapper';

@Injectable()
export class DrizzleUserRepository implements UserRepositoryPort {
  constructor(@Inject(DRIZZLE) private readonly db: NodePgDatabase) {}
  findById(id: string): Promise<User | null> | User | null {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<User[]> | User[] {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> | void {
    throw new Error('Method not implemented.');
  }

  async save(user: User): Promise<User> {
    const rawData = UserMapper.toPersistence(user);

    await this.db.insert(usersTable).values(rawData).onConflictDoUpdate({
      target: usersTable.id,
      set: rawData,
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (!result.length) return null;

    return UserMapper.toDomain(result[0]);
  }
}
