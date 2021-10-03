import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateNftDto } from '../dtos/create-nft.dto';
import { NftService } from '../services/nft.service';

@UseGuards(JwtAuthGuard)
@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Get()
  async index() {
    return this.nftService.findAll();
  }

  @Post()
  async create(@Body(ValidationPipe) dto: CreateNftDto) {
    return this.nftService.create(dto);
  }
}
