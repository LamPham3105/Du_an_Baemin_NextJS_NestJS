import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RestaurantsService {
  private prisma = new PrismaClient();

  async getRestaurants() {
    return this.prisma.restaurants.findMany({
      include: { foods: true },
    });
  }

  // Get restaurants with pagination and search
  async getPaginationRestaurants(
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ) {
    // Calculate the offset based on the page and limit
    const skip = (page - 1) * limit;

    // Ensure limit is a number
    const numericLimit = Number(limit);

    // Query the database with search and pagination
    const restaurants = await this.prisma.restaurants.findMany({
      where: {
        name: {
          contains: search, // Search restaurants by name
          mode: 'insensitive', // Case-insensitive search
        },
      },
      skip,
      take: numericLimit, // Use the converted number here
      include: {
        foods: true, // Include related foods
      },
    });

    // Process and return the data
    const processedRestaurants = restaurants.map((restaurant) => {
      const processedFoods = restaurant.foods.map((food) => ({
        ...food,
        max_price: food.max_price ? food.max_price.toNumber() : 0, // Convert Decimal to number
      }));

      return {
        ...restaurant,
        foods: processedFoods,
      };
    });

    // Return the processed data with paginated metadata
    return {
      data: processedRestaurants,
      meta: {
        total: await this.prisma.restaurants.count(), // Count for pagination metadata
        page,
        last_page: Math.ceil(
          (await this.prisma.restaurants.count()) / numericLimit,
        ),
      },
    };
  }

  // Get a single restaurant by id
  async getRestaurantById(id: number) {
    const restaurant = await this.prisma.restaurants.findUnique({
      where: { id },
      include: { foods: true },
    });

    if (!restaurant) {
      return null; // Or throw an exception if desired
    }

    // Process foods and convert Decimal to number for max_price
    const processedFoods = restaurant.foods.map((food) => ({
      ...food,
      max_price: food.max_price ? food.max_price.toNumber() : 0,
    }));

    return {
      ...restaurant,
      foods: processedFoods,
    };
  }
}
