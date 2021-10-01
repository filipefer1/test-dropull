import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateAssetDto } from '../dtos/create-asset.dto';
import { createAssetFileInterceptor } from '../helpers/create-asset-file.interceptor';
import { AssetService } from '../services/asset.service';

@UseGuards(JwtAuthGuard)
@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get()
  async index() {
    return this.assetService.findAll();
  }

  @Post()
  @UseInterceptors(createAssetFileInterceptor())
  async create(
    @UploadedFiles() uploadedFiles: Express.Multer.File,
    @Body(ValidationPipe) dto: CreateAssetDto,
  ) {
    const asset = uploadedFiles['asset'][0];
    return this.assetService.create({ ...dto, asset: asset.path });
  }
}
