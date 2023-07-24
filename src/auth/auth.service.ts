import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.usersService.findUserByUsername(username);
    if (!user) {
      throw new NotFoundException();
    }
    if (!(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, username: user.username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async register(username: string, password: string) {
    const user = await this.usersService.findUserByUsername(username);
    // return 409 conflict if there is already a user
    if (user) throw new ConflictException();

    const passwordHash = await argon2.hash(password);
    const newUser = await this.usersService.createUser(username, passwordHash);

    const payload = { sub: newUser._id, username: newUser.username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  // todo forgot password
  // async forgotPassword(username) {}
}
