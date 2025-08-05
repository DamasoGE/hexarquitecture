import { User } from '../../../domain/User';
import { UserRepository } from '../../../interfaces/userRepository';

interface CreateUserDTO {
  name: string;
  email: string;
}

export class CreateUser {
  constructor(private userRepo: UserRepository) {}

  async execute(userData: CreateUserDTO) {
    
    const user = new User(userData.name, userData.email);
    await this.userRepo.save(user);
    return user;
  }
}
