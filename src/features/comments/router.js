import { Router } from 'express';
import { controller } from './controller.js';

export const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API для работы с комментариями
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     tags: [Comments]
 *     summary: Создание нового комментария
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               taskId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Комментарий успешно создан
 */
router.post('/', controller.createComment);

/**
 * @swagger
 * /api/comments/{taskId}:
 *   get:
 *     tags: [Comments]
 *     summary: Получение всех комментариев по идентификатору задачи
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: Идентификатор задачи, для которой нужно получить комментарии
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Список комментариев для указанной задачи
 *       404:
 *         description: Задача не найдена
 */
router.get('/:taskId', controller.findByTaskId);


/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     tags: [Comments]
 *     summary: Обновление комментария по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID комментария
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Комментарий обновлён
 *       404:
 *         description: Комментарий не найден
 */
router.put('/:id', controller.updateComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: Удаление комментария по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID комментария
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Комментарий успешно удалён
 *       404:
 *         description: Комментарий не найден
 */
router.delete('/:id', controller.deleteComment);

