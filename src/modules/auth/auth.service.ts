import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import type { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    await this.usersService.patch({ id: user.id, token: accessToken });

    return {
      access_token: accessToken,
    };
  }

  async signup(user: User) {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    await this.usersService.patch({ id: user.id, token: accessToken });

    return this.jwtService.sign(payload);
  }
}
