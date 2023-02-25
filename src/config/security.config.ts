import { registerAs } from '@nestjs/config';

export default registerAs('security', () => ({
  ttl: parseInt(process.env.SECURITY_TTL) || 60,
  limit: parseInt(process.env.SECURITY_TTL) || 10,
}));

export interface SecurityConfig {
  ttl: number;
  limit: number;
}
