import { Router } from "express";
import { UserRepository } from "../../interfaces/userRepository";
import { UserController } from "../web/UserController";

export function userRoutes(userRepo: UserRepository) {
  const router = Router();
  const controller = new UserController(userRepo);

  router.post("/", (req, res) => controller.create(req, res));

  router.get("/", (req, res) => controller.list(req, res));

  router.get("/:id", (req, res) => controller.getById(req, res));

  router.delete("/:id", (req, res) => controller.delete(req, res));

  return router;
}
