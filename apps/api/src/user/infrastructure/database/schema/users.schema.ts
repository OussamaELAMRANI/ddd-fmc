import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email').notNull().unique(),
  name: varchar('name').notNull(),
  // Drizzle stores primitives, Domain uses Value Objects
  password: varchar('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
