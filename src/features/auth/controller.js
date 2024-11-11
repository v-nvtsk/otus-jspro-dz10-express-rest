import { logger } from '../../utils/logger.js';
import { query } from '../../config/db.js';
import { addTokenToCookies, deleteTokenFromCookies } from '../../utils/cookies.js';
import { queries } from '../../models/index.js';
import { generateAccessToken } from '../../utils/jwt.js';
import { checkPassword, hashPassword } from '../../utils/password.js';
import { deleteAccessTokenFromDatabase, storeAccessTokenInDatabase } from '../../utils/access-token.js';

export const logout = async (req, res) => {
  const { userId } = req.user
  if (userId) await deleteAccessTokenFromDatabase(userId);

  deleteTokenFromCookies(res);


  logger.info(`User logged out: ${req.user.username}`);
  res.status(200).json({ message: 'Logout successful' });
};


export const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const userExists = await query(queries.users.getUserByName(username));
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const roleName = 'user'
    const roleCheckResult = await query(queries.roles.getRoleByName(roleName));
    const roleId = roleCheckResult.rows[0]?.id;

    if (!roleId) {
      logger.error(`Ошибка: Роль ${roleName} не найдена в таблице roles.`);
      return res.status(500).json({ message: 'An error occurred while registering the user' });
    }

    const hashedPassword = await hashPassword(password);
    await query(queries.users.createUser(username, hashedPassword, roleId));

    logger.info(`User registered successfully: ${username}`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    logger.error('Error registering user:', error);
    res.status(500).json({ message: 'An error occurred while registering the user' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await query(queries.users.getUserByName(username));

    const hashedPassword = result.rows[0]?.password;
    const userId = result.rows[0]?.id;

    if (!hashedPassword) {
      return res.status(401).json({ message: 'Invalid login or password' });
    }

    const isPasswordCorrect = await checkPassword(password, hashedPassword);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid login or password' });
    }

    const user = { username, userId };

    const accessToken = generateAccessToken(user, Number(process.env.JWT_ACCESS_EXPIRES_IN));
    const expiresAt = new Date(Date.now() + Number(process.env.JWT_ACCESS_EXPIRES_IN) * 1000);
    await storeAccessTokenInDatabase(user, accessToken, expiresAt);

    addTokenToCookies(res, accessToken, expiresAt)

    logger.info(`Login successful: ${username}`);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    logger.error('Error logging in user:', error);
    return res.status(500).json({ message: 'An error occurred while logging in the user' });
  }
};
