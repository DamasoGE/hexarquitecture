import { Request, Response } from 'express';
import { CreateUser } from '../../application/usecases/user/CreateUser';
import { UserRepository } from '../../interfaces/userRepository';
import { GetUsers } from '../../application/usecases/user/GetUsers';

export class UserController {
  private createUserUseCase: CreateUser;
  private getUsersUseCase: GetUsers;

  constructor(userRepo: UserRepository) {
    this.createUserUseCase = new CreateUser(userRepo);
    this.getUsersUseCase = new GetUsers(userRepo);
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        res.status(400).json({ message: 'Missing required fields: name, email' });
        return;
      }

      // Si usas UUID o auto-generate id, puedes omitir validar el id

      const user = await this.createUserUseCase.execute({ name, email });

      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

    async list(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.getUsersUseCase.execute();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching pets:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // Más métodos como obtener usuario, actualizar, eliminar...
}
