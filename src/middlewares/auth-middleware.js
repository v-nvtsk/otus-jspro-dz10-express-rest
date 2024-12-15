import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';
import { deleteAccessTokenFromDatabase } from '../utils/access-token.js';
import { generateAccessToken, verifyAccessToken } from '../utils/jwt.js';
import { queries } from '../models/index.js';
import { addTokenToCookies, deleteTokenFromCookies } from '../utils/cookies.js';

export const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (accessToken) {
    try {
      const user = verifyAccessToken(accessToken);
      const { username, userId } = user;

      const newAccessToken = generateAccessToken({ username, userId }, Number(process.env.JWT_ACCESS_EXPIRES_IN));
      addTokenToCookies(res, newAccessToken, new Date(Date.now() + Number(process.env.JWT_ACCESS_EXPIRES_IN) * 1000));

      const result = await query(queries.roles.getRoleNameByUserId(userId));
      if (result.rows.length === 0) {
        throw new Error('Role not found');
      }
      const role = result.rows[0]?.name;

      req.user = { ...user, role, isAuthenticated: true };
      return next();
    } catch (error) {
      const user = jwt.decode(accessToken, process.env.JWT_SECRET);
      if (user) await deleteAccessTokenFromDatabase(user.id);
      deleteTokenFromCookies(res);
    }
  }
  return res.status(401).json({ message: 'Unauthorized' });
};
