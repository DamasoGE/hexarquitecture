import { Request, Response } from "express";
import { CreatePet } from "../../application/usecases/pet/CreatePet";
import { GetPets } from "../../application/usecases/pet/GetPets";
import { PetRepository } from "../../interfaces/petRepository";
import { DeleteUser } from "../../application/usecases/user/DeleteUser";
import { DeletePet } from "../../application/usecases/pet/DeletePet";
import { GetPetById } from "../../application/usecases/pet/GetPetById";

export class PetController {
  private createPetUseCase: CreatePet;
  private getPetsUseCase: GetPets;
  private getPetByIdUseCase: GetPetById;
  private deletePetUseCase: DeletePet;

  constructor(petRepo: PetRepository) {
    this.createPetUseCase = new CreatePet(petRepo);
    this.getPetsUseCase = new GetPets(petRepo);
    this.deletePetUseCase = new DeletePet(petRepo);
    this.getPetByIdUseCase= new GetPetById(petRepo)
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, species, ownerId } = req.body;

      if (!name || !species || !ownerId) {
        res
          .status(400)
          .json({ message: "Missing required fields: name, species, ownerId" });
        return;
      }

      const pet = await this.createPetUseCase.execute({
        name,
        species,
        ownerId,
      });

      res.status(201).json(pet);
    } catch (error) {
      console.error("Error creating pet:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const pets = await this.getPetsUseCase.execute();
      res.status(200).json(pets);
    } catch (error) {
      console.error("Error fetching pets:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

   async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ error: 'Pet ID requered' });
        return;
      }

      const pet = await this.getPetByIdUseCase.execute(id);

      if (!pet) {
        res.status(404).json({ error: 'Pet Not Found' });
        return;
      }

      res.status(200).json(pet);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ error: "Pet ID requered" });
        return;
      }

      await this.deletePetUseCase.execute(id);
      res.status(200).json({message: "Pet deleted"});
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
