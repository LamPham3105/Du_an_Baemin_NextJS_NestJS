import { Controller, Get } from '@nestjs/common';
import { BannerService } from './banner.service';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  async getCategories() {
    return this.bannerService.getBanner();
  }
}
