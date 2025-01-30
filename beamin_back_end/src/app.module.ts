import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BannerModule } from './banner/banner.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [RestaurantsModule, CategoriesModule, UsersModule, AuthModule, BannerModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
