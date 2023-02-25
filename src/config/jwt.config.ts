import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'my-secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '60s',
}));

export interface JwtConfig {
  secret: number;
  expiresIn: number;
}
