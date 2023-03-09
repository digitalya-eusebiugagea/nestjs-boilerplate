import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserDto } from '../users/create-user.dto';
import { UsersService } from '../users/users.service';
import { User } from './../users/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guard';
import { LoginResponseDto } from './login-response.dto';

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('signup')
  @ApiCreatedResponse({ type: User })
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const token = await this.authService.signup(user);

    return { ...user, token };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: LoginResponseDto })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
