export const addTokenToCookies = (res, token, expiresAt) => {
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt
  });
}

export const deleteTokenFromCookies = (res) => {
  res.clearCookie('accessToken');
}