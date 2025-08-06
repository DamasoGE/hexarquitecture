import { Request, Response } from "express";
import { CreateUser } from "../../application/usecases/user/CreateUser";
import { UserRepository } from "../../interfaces/userRepository";
import { GetUsers } from "../../application/usecases/user/GetUsers";
import { DeleteUser } from "../../application/usecases/user/DeleteUser";
import { GetUserById } from "../../application/usecases/user/GetUserById";

export class UserController {
  private createUserUseCase: CreateUser;
  private getUsersUseCase: GetUsers;
  private deleteUserUseCase: DeleteUser;
  private getUserByIdUseCase: GetUserById;

  constructor(userRepo: UserRepository) {
    this.createUserUseCase = new CreateUser(userRepo);
    this.getUsersUseCase = new GetUsers(userRepo);
    this.deleteUserUseCase = new DeleteUser(userRepo);
    this.getUserByIdUseCase = new GetUserById(userRepo);
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        res
          .status(400)
          .json({ message: "Missing required fields: name, email" });
        return;
      }

      const user = await this.createUserUseCase.execute({ name, email });

      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.getUsersUseCase.execute();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching pets:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ error: "User ID required" });
        return;
      }

      const pet = await this.getUserByIdUseCase.execute(id);

      if (!pet) {
        res.status(404).json({ error: "User Not Found" });
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
        res.status(400).json({ error: "User ID required" });
        return;
      }

      await this.deleteUserUseCase.execute(id);
      res.status(200).json({message: "User deleted"});
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
