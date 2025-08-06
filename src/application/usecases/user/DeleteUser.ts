import { UserRepository } from "../../../interfaces/userRepository";


export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('ID de usuario requerido');
    }

    await this.userRepository.delete(id);
  }
}
