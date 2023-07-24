import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.signIn(username, password);
  }

  @Post('register')
  register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.register(username, password);
  }
}
