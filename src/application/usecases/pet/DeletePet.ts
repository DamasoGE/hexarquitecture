import { PetRepository } from "../../../interfaces/petRepository";

export class DeletePet {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('ID de pet requerido');
    }

    await this.petRepository.delete(id);
  }
}
