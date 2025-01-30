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

    const userFind = await this.usersService.findByUsername(
      user.usernameOrEmail,
    );

    // Create the payload for the JWT
    const payload = { username: userFind.username, sub: userFind.id };

    // Generate the access token using the payload
    const accessToken = this.jwtService.sign(payload);

    // Exclude the password field from the user data
    const { password, ...userData } = userFind; // Destructure to exclude password

    // Return the access token along with user data (excluding password)
    return {
      accessToken,
      user: userFind.id, // Return user data without the password field
    };
  }
}
