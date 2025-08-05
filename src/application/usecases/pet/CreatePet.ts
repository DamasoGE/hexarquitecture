import { Pet } from "../../../domain/Pet";
import { PetRepository } from "../../../interfaces/petRepository";

interface CreatePetDTO {
  name: string;
  species: string;
  ownerId: string;
}

export class CreatePet {
  constructor(private petRepo: PetRepository) {}

  async execute(petData: CreatePetDTO): Promise<Pet> {
    const pet = new Pet(petData.name, petData.species, petData.ownerId);
    await this.petRepo.save(pet);
    return pet;
  }
}
