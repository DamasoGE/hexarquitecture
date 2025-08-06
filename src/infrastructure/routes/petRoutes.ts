import { Router } from "express";
import { PetRepository } from "../../interfaces/petRepository";
import { PetController } from "../web/PetController";

export function petRoutes(petRepo: PetRepository) {
  const router = Router();
  const controller = new PetController(petRepo);

  router.post("/", (req, res) => controller.create(req, res));

  router.get("/", (req, res) => controller.list(req, res));

  router.get("/:id", (req, res) => controller.getById(req, res));

  router.delete("/:id", (req, res) => controller.delete(req, res));

  return router;
}
