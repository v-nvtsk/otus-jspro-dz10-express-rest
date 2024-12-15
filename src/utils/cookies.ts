import { Response } from 'express';

export const addTokenToCookies = (
  res: Response,
  token: string,
  expiresAt: Date,
) => {
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
  });
};

export const deleteTokenFromCookies = (res) => {
  res.status(200).clearCookie('accessToken');
};
