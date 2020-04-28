import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  const sevedDaysExpirationPeriod = new Date(
    Date.now() + 60 * 60 * 24 * 7 * 1000
  );

  res.cookie("token", token, {
    httpOnly: true,
    path: "/refresh_token",
    expires: sevedDaysExpirationPeriod,
  });
};

export const sendRefreshTokenReject = (res: Response) => {
  res.send({ ok: false, accessToken: "" });
};
