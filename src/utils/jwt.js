import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload, expiresIn) => jwt.sign(payload, process.env.JWT_ACCESS_SECRET,
  { expiresIn });

export const verifyAccessToken = (token) => jwt.verify(token, process.env.JWT_ACCESS_SECRET);
