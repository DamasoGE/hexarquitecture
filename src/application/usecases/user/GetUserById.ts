import { User } from "../../../domain/User";
import { UserRepository } from "../../../interfaces/userRepository";

export class GetUserById {
  constructor(private userRepo: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    const user = await this.userRepo.findById(id);
    return user;
  }
}
