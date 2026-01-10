import { Injectable } from '@nestjs/common';
import { User } from '@/user/domain/entity/user.entity';
import { UserRepositoryPort } from '@/user/application/ports/user.repository.port';

@Injectable()
export class InMemoryUserRepository implements UserRepositoryPort {
  private readonly users: Map<string, User> = new Map();

  save(user: User) {
    this.users.set(user.getId().getValue(), user);
    return user;
  }

  findById(id: string) {
    return this.users.get(id) || null;
  }

  findByEmail(email: string) {
    const users = Array.from(this.users.values());
    return users.find((user) => user.getEmail().getValue() === email) || null;
  }

  findAll() {
    return Array.from(this.users.values());
  }

  delete(id: string) {
    this.users.delete(id);
  }
}
