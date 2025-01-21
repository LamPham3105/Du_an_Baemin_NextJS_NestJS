import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.validateUser(username, password);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    // Ensure the user is valid
    if (!user) {
      throw new Error('User not found');
    }

    // Create the payload for the JWT
    const payload = { username: user.username, sub: user.id };

    // Generate the access token using the payload
    const accessToken = this.jwtService.sign(payload);

    // Exclude the password field from the user data
    const { password, ...userData } = user; // Destructure to exclude password

    // Return the access token along with user data (excluding password)
    return {
      accessToken,
      user: userData, // Return user data without the password field
    };
  }
}
