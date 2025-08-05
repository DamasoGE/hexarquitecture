import { Pet } from '../domain/Pet';

export interface PetRepository {
  findById(id: string): Promise<Pet | null>;
  findAll(): Promise<Pet[]>;
  save(pet: Pet): Promise<void>;
}