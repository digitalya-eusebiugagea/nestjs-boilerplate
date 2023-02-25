import { AppConfig } from './app.config';
import { JwtConfig } from './jwt.config';
import { SecurityConfig } from './security.config';

export interface EnvironmentConfig {
  app: AppConfig;
  security: SecurityConfig;
  jwt: JwtConfig;
}
