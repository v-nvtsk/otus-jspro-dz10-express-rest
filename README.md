# Express REST-API server

## Описание

Express-REST — это REST API, обеспечивающий возможности для управления пользователями, ролями, задачами и комментариями. Проект поддерживает авторизацию и аутентификацию с помощью access токена, а также использует Swagger для документации.

## Стек технологий

- Node.js
- Express
- PostgreSQL
- JSON Web Tokens (JWT) для авторизации
- Swagger для документации API

## Начало работы

### Установка

1. Склонируйте репозиторий:

    ```bash
    git clone https://github.com/v-nvtsk/otus-jspro-dz10-express-rest.git
    cd otus-jspro-dz10-express-rest
    ```

2. Установите зависимости:

    ```bash
    npm install
    ```

3. Создайте файл `.env` в корневой директории и добавьте следующие переменные:

    ```plaintext
    PORT=
    PGUSER=
    PGHOST=
    PGDATABASE=
    PGPASSWORD=
    PGPORT=
    SECRET_KEY=
    JWT_ACCESS_SECRET=
    JWT_ACCESS_EXPIRES_IN=
    ```

### Запуск проекта

1. Запустите PostgreSQL и создайте необходимую базу данных (если она еще не создана).
2. Запустите сервер. Необходимые таблицы будут автоматически созданы. Также будет создан пользователь `superuser` с ролью `admin` и паролем `superuser`:

    ```bash
    npm start
    ```

   Сервер должен запуститься на [http://localhost:3000](http://localhost:3000).

### Скрипты

- `npm start`: Запуск сервера в продакшен-режиме.
- `npm run dev`: Запуск сервера в режиме разработки.
- `npm run lint`: Проверка кода с помощью ESLint.
- `npm run test`: Запуск тестов.

## API Документация

Документация API доступна по адресу [http://localhost:3000/docs](http://localhost:3000/docs) (Swagger UI).

### Основные маршруты API

| Метод | Маршрут            | Описание                                      |
|-------|---------------------|-----------------------------------------------|
| POST  | `/auth/register`    | Регистрация нового пользователя               |
| POST  | `/auth/login`       | Авторизация пользователя                      |
| POST  | `/auth/logout`      | Логаут пользователя, удаление refresh токена  |
| GET   | `/tasks`            | Получение списка задач                        |
| GET   | `/tasks/:id`        | Получение информации о задаче                 |
| POST  | `/tasks`            | Создание новой задачи                         |
| PUT   | `/tasks/:id`        | Изменение задачи                              |
| DELETE| `/tasks/:id`        | Удаление задачи                               |
| POST  | `/comments`         | Добавление комментария к задаче               |
| GET   | `/comments/:taskId` | Получение комментариев к задаче               |
| PUT   | `/comments/:id`     | Изменение комментария                         |
| DELETE| `/comments/:id`     | Удаление комментария                          |

## Аутентификация и авторизация

Проект использует JWT для аутентификации и авторизации:

- **Access Token** — короткоживущий токен, используется для доступа к защищённым маршрутам.

Access токен отправляется и проверяется через cookies. 

## Структура проекта

```plaintext
.
├── src
│   ├── config            # Конфигурации проекта (база данных и т.д.)
│   ├── features          # Маршруты и спецификации Swagger для каждой фичи
│   ├── middlewares       # Промежуточные слои для обработки запросов
│   ├── models            # Определения моделей базы данных
│   ├── utils             # Утилиты для вспомогательных функций
│   └── index.js          # Основной файл запуска приложения
├── .env.example          # Шаблон файла .env
└── README.md
```