import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  async createUser(userData: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
  }): Promise<any> {
    // Check if the username already exists
    const existingUser = await this.prisma.users.findUnique({
      where: { username: userData.username },
    });

    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Check if the email already exists (optional but common)
    const existingEmail = await this.prisma.users.findUnique({
      where: { email: userData.email },
    });

    if (existingEmail) {
      throw new Error('Email already exists');
    }

    // Check if the phone number already exists (optional but common)
    const existingPhoneNumber = await this.prisma.users.findUnique({
      where: { phone_number: userData.phoneNumber },
    });

    if (existingPhoneNumber) {
      throw new Error('Phone number already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Create the user in the database
    return this.prisma.users.create({
      data: {
        first_name: userData.firstName,
        last_name: userData.lastName,
        username: userData.username,
        email: userData.email,
        phone_number: userData.phoneNumber,
        password: hashedPassword,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        username: true,
        email: true,
        phone_number: true,
      },
    });
  }

  async findByUsername(username: string): Promise<any | null> {
    return this.prisma.users.findUnique({
      where: { username },
    });
  }

  async validateUser(username: string, password: string): Promise<any | null> {
    const user = await this.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
