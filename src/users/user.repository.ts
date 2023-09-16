// user.repository.ts

import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity'; // Assuming you have a User entity

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Add custom database query methods here if needed
}
