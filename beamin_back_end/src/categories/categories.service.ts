import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CategoriesService {
  private prisma = new PrismaClient();

  async getCategories() {
    return this.prisma.categories.findMany({
      include: { foods: true },
    });
  }

  async getCategoryById(id: number) {
    return this.prisma.categories.findUnique({
      where: { id },
      include: { foods: true },
    });
  }
}
