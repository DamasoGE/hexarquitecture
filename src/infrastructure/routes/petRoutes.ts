import { Router } from 'express';
import { PetRepository } from '../../interfaces/petRepository';
import { PetController } from '../web/PetController';

export function petRoutes(petRepo: PetRepository) {
  const router = Router();
  const controller = new PetController(petRepo);

  router.post('/', (req, res) => controller.create(req, res));

  router.get('/', (req, res) => controller.list(req, res));

  return router;
}
