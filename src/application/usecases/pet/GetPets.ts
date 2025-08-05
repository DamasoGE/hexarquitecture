import { Pet } from "../../../domain/Pet";
import { PetRepository } from "../../../interfaces/petRepository";

export class GetPets {
  constructor(private petRepo: PetRepository) {}

  async execute(): Promise<Pet[]> {
    const pets = await this.petRepo.findAll();
    return pets;
  }
}
