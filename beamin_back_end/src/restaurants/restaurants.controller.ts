import { Controller, Get, Param, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  // Get restaurants without pagination (maybe for a simple list)
  @Get()
  async getRestaurants() {
    return this.restaurantsService.getRestaurants();
  }

  // Get restaurants with pagination and search, use a custom path like '/pagin'
  @Get('pagination') // Custom path for pagination and search
  async getRestaurantsWithPagination(
    @Query('page') page: number = 1, // Default to page 1
    @Query('limit') limit: number = 10, // Default to 10 items per page
    @Query('search') search: string = '', // Default to an empty string for search
  ) {
    return this.restaurantsService.getPaginationRestaurants(
      page,
      limit,
      search,
    );
  }

  // Existing method to get a specific restaurant by id
  @Get(':id') // Use :id to get restaurant by ID
  async getRestaurantById(@Param('id') id: number) {
    return this.restaurantsService.getRestaurantById(+id);
  }
}
