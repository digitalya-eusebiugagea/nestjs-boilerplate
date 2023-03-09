import type { AppConfig } from './app.config';
import type { JwtConfig } from './jwt.config';
import type { SecurityConfig } from './security.config';

export interface EnvironmentConfig {
  app: AppConfig;
  security: SecurityConfig;
  jwt: JwtConfig;
}
