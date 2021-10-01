import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsOptional()
  asset?: string;

  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  description: string;

  @IsOptional()
  ipfs?: string;
}
