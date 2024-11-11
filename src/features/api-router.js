import { Router } from "express";
import { authRouter } from "./auth/index.js";
import { tasksRouter } from "./tasks/index.js";
import { authenticate } from '../middlewares/auth-middleware.js';
import { commentsRouter } from "./comments/index.js";

export const apiRouter = new Router();

apiRouter.use('/auth', authRouter)
apiRouter.use('/tasks', authenticate, tasksRouter)
apiRouter.use('/comments', authenticate, commentsRouter)

