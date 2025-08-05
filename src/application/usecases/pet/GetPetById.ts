import { Pet } from "../../../domain/Pet";
import { PetRepository } from "../../../interfaces/petRepository";


export class GetPetById {
  constructor(private petRepo: PetRepository) {}

  async execute(id: string): Promise<Pet | null> {
    const pet = await this.petRepo.findById(id);
    return pet;
  }
}
