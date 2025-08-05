import { Request, Response } from 'express';
import { CreatePet } from '../../application/usecases/pet/CreatePet';
import { GetPets } from '../../application/usecases/pet/GetPets';
import { PetRepository } from '../../interfaces/petRepository';

export class PetController {
  private createPetUseCase: CreatePet;
  private getPetsUseCase: GetPets;

  constructor(petRepo: PetRepository) {
    this.createPetUseCase = new CreatePet(petRepo);
    this.getPetsUseCase = new GetPets(petRepo);
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, species, ownerId } = req.body;

      if (!name || !species || !ownerId) {
        res.status(400).json({ message: 'Missing required fields: name, species, ownerId' });
        return;
      }

      const pet = await this.createPetUseCase.execute({ name, species, ownerId });

      res.status(201).json(pet);
    } catch (error) {
      console.error('Error creating pet:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const pets = await this.getPetsUseCase.execute();
      res.status(200).json(pets);
    } catch (error) {
      console.error('Error fetching pets:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
