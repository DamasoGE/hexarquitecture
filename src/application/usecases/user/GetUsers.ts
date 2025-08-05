import { User } from "../../../domain/User";
import { UserRepository } from "../../../interfaces/userRepository";

export class GetUsers {
  constructor(private userRepo: UserRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepo.findAll();
    return users;
  }
}
