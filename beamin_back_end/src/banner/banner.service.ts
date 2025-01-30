import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BannerService {
  private prisma = new PrismaClient();

  async getBanner() {
    return this.prisma.banner.findMany();
  }
}
