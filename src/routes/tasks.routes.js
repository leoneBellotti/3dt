import { Router } from "express";
import { authRequired } from "../middlewares/validadeToken.js";
import {getTasks,createTasks,getTask,updateTasks,deleteTasks,getCartola,getMercadoStatus,getPartidas,loginCartola,getBet} from "../controllers/task.controller.js"
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.post('/loginCartola', loginCartola);
router.get('/cartola', getCartola);
router.get('/bet', getBet);
router.get('/mercadoStatus', getMercadoStatus);
router.get('/partidas', getPartidas);
router.get('/tasks', getTasks);
router.get('/tasks/:id',authRequired, getTask)
router.post('/tasks',authRequired,validateSchema(createTaskSchema),createTasks)
router.delete('/tasks/:id',authRequired, deleteTasks)
router.put('/tasks/:id',authRequired, updateTasks)

export default router;