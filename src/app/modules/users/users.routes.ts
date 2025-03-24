import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { usersController } from "./users.controller";
import { usersUpdateValidation, usersValidation } from "./users.validation";

const router = express.Router();

router.post("/create", validateRequest(usersValidation), usersController.create);
router.get("/", usersController.getAll);
router.get("/:id", usersController.getById);
router.put("/:id", validateRequest(usersUpdateValidation), usersController.update);
router.delete("/:id", usersController.delete);
router.delete("/bulk", usersController.bulkDelete);

export const usersRoutes = router;