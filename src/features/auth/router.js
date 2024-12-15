import { Router } from 'express';
import { register, login, logout } from './controller.js';

export const router = new Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Имя пользователя
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: Пароль пользователя
 *                 example: password123
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Некорректные данные или пользователь уже существует
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Username already exists
 *       500:
 *         description: Ошибка на сервере
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while registering the user
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Авторизация пользователя
 *     description: Вход пользователя в систему с проверкой имени пользователя и пароля.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Имя пользователя
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: Пароль пользователя
 *                 example: password123
 *     responses:
 *       200:
 *         description: Успешная авторизация
 *         headers:
 *           Set-Cookie:
 *             description: Set the authentication token in a cookie.
 *             type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *       401:
 *         description: Неверный пароль
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid password
 *       404:
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Ошибка сервера
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Выход из системы
 *     description: Завершает сессию пользователя, делая токен недействительным.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Выход выполнен успешно
 *       401:
 *         description: Требуется аутентификация
 */
router.get('/logout', logout);
