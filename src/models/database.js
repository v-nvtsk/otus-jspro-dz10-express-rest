export const database = {
    init: () => ({
        text: `
        -- Создаем таблицу roles для хранения ролей пользователей, если она не существует
        CREATE TABLE IF NOT EXISTS roles (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) UNIQUE NOT NULL
        );

        -- Создаем таблицу users с полями username, password и ссылкой на таблицу roles, если она не существует
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
            state VARCHAR(50) NOT NULL DEFAULT 'registered'
        );


        -- Создаем таблицу user_tokens для хранения access токенов пользователей, если она не существует
        CREATE TABLE IF NOT EXISTS user_tokens (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            token TEXT NOT NULL,
            expires_at TIMESTAMP NOT NULL
        );
        

        -- Создаем индексы только если они не существуют
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 
                FROM pg_class c
                JOIN pg_namespace n ON n.oid = c.relnamespace
                WHERE c.relname = 'idx_users_username' AND n.nspname = 'public'
            ) THEN
                CREATE UNIQUE INDEX idx_users_username ON users(username);
            END IF;
            
            IF NOT EXISTS (
                SELECT 1 
                FROM pg_class c
                JOIN pg_namespace n ON n.oid = c.relnamespace
                WHERE c.relname = 'idx_user_tokens_token' AND n.nspname = 'public'
            ) THEN
                CREATE INDEX idx_user_tokens_token ON user_tokens(token);
            END IF;
        END $$;

        -- Создаем таблицу tasks для хранения задач, если она не существует
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            input_examples TEXT,
            output_examples TEXT,
            difficulty VARCHAR(50),
            tags TEXT[],
            additional_materials TEXT[]
        );

        -- Создаем таблицу comments для комментариев к задачам, если она не существует
        CREATE TABLE IF NOT EXISTS comments (
            id SERIAL PRIMARY KEY,
            task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Добавляем начальные данные в таблицу roles, если их нет
        INSERT INTO roles (name) VALUES 
        ('admin'),
        ('user'),
        ('interviewer')
        ON CONFLICT (name) DO NOTHING;
`}),
    addSuperuser: (username, hashedPassword) => ({
        text: `
        INSERT INTO users (username, password, role_id)
        VALUES ($1, $2, (SELECT id FROM roles WHERE name = $3))
        `,
        values: [username, hashedPassword, 'admin']
    })
}