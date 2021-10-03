import { IsDefined, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateNftDto {
  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsString()
  @IsDefined()
  assetId: string;
}
