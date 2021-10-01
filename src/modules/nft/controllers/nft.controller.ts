import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('nft')
export class NftController {
  @UseGuards(JwtAuthGuard)
  @Get()
  async index() {
    return;
  }
}
