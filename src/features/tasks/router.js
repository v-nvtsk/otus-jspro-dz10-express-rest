import { Router } from "express";
import { controller as tasksController } from './controller.js';

export const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API для управления задачами
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Получить все задачи
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Список всех задач
 *       500:
 *         description: Ошибка сервера
 */
router.get("/", tasksController.getAllTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Получить задачу по ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID задачи
 *     responses:
 *       200:
 *         description: Задача найдена и возвращена
 *       404:
 *         description: Задача не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.get("/:id", tasksController.getTaskById);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Создать новую задачу
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Заголовок задачи
 *               description:
 *                 type: string
 *                 description: Описание задачи
 *               input_examples:
 *                 type: string
 *                 description: Примеры входных данных
 *               output_examples:
 *                 type: string
 *                 description: Примеры выходных данных
 *               difficulty:
 *                 type: string
 *                 description: Уровень сложности задачи
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Теги задачи
 *               additional_materials:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Дополнительные материалы
 *     responses:
 *       201:
 *         description: Задача успешно создана
 *       400:
 *         description: Неверные данные
 *       500:
 *         description: Ошибка сервера
 */
router.post("/", tasksController.createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Обновить задачу по ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID задачи
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Заголовок задачи
 *               description:
 *                 type: string
 *                 description: Описание задачи
 *               input_examples:
 *                 type: string
 *                 description: Примеры входных данных
 *               output_examples:
 *                 type: string
 *                 description: Примеры выходных данных
 *               difficulty:
 *                 type: string
 *                 description: Уровень сложности задачи
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Теги задачи
 *               additional_materials:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Дополнительные материалы
 *     responses:
 *       200:
 *         description: Задача успешно обновлена
 *       404:
 *         description: Задача не найдена
 *       400:
 *         description: Неверные данные
 *       500:
 *         description: Ошибка сервера
 */
router.put("/:id", tasksController.updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Удалить задачу по ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID задачи
 *     responses:
 *       200:
 *         description: Задача успешно удалена
 *       404:
 *         description: Задача не найдена
 *       500:
 *         description: Ошибка сервера
 */
router.delete("/:id", tasksController.deleteTask);


