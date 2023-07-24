export type RequestGuardUser = {
  user: { sub: string; username: string; iat: number; exp: number };
};
