import { User } from '../domain/User';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  save(user: User): Promise<void>;
}
