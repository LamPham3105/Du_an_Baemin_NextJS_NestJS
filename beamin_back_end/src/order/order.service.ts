import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order-status.enum';

@Injectable()
export class OrderService {
  private prisma = new PrismaClient();

  async createOrder(dto: CreateOrderDto) {
    const { user_id, order_items, address } = dto;

    if (!user_id || !order_items || order_items.length === 0) {
      throw new Error('Invalid order data');
    }

    const total_price = order_items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = await this.prisma.orders.create({
      data: {
        user_id,
        total_price,
        status: OrderStatus.PENDING,
        address,
        order_items: {
          create: order_items.map((item) => ({
            food_id: item.food_id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { order_items: true },
    });

    await this.prisma.order_items.createMany({
      data: order_items.map((item) => ({
        order_id: order.id,
        food_id: item.food_id,
        quantity: item.quantity,
        price: item.price,
      })),
    });

    return order;
  }

  async getOrders() {
    return this.prisma.orders.findMany({ include: { order_items: true } });
  }
}
