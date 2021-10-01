import { BadRequestException, HttpService, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as FormData from 'form-data';
import { CreateAssetDto } from '../dtos/create-asset.dto';
import * as path from 'path';
import { config } from '../../../config/configuration';
import { IpfsResponseDto } from '../dtos/ipfs-response.dto';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AssetRepository } from '../repositories/asset.repository';

@Injectable()
export class AssetService {
  constructor(
    private readonly assetRepository: AssetRepository,
    private readonly httpService: HttpService,
  ) {}

  async create(dto: CreateAssetDto) {
    const ipfs = await lastValueFrom(await this.createIpfs(dto));

    if (ipfs.isDuplicate) {
      return;
    }

    const asset = this.assetRepository.create({
      ...dto,
      ipfsHash: ipfs.IpfsHash,
      pinSize: ipfs.PinSize,
      ipfsTimestamp: ipfs.Timestamp,
      destination: dto.asset,
    });

    return this.assetRepository.save(asset);
  }

  private async createIpfs(dto: CreateAssetDto) {
    const url = config.PINATA.url;

    const form = new FormData();
    const filePath = this.formatFilePath(dto.asset);

    const file = fs.createReadStream(filePath);

    form.append('file', file);

    const response = this.httpService
      .post<IpfsResponseDto>(url, form, {
        maxBodyLength: Infinity,
        headers: {
          Authorization: `Bearer ${config.PINATA.acess_token}`,
          'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`,
        },
      })
      .pipe(
        map(response => response.data),
        catchError(error => {
          throw new BadRequestException(`PINATA ERROR - ` + error.message);
        }),
      );

    return response;
  }

  private formatFilePath(asset: string) {
    return path.join(__dirname, '..', '..', '..', '..', asset);
  }
}
