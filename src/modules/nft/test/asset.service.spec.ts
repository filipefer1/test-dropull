import {
  BadRequestException,
  HttpModule,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateAssetDto } from '../dtos/create-asset.dto';
import { AssetRepository } from '../repositories/asset.repository';
import { AssetService } from '../services/asset.service';
import { AssetMock } from './mocks/asset.mock';

const mockAssetRepository = () => ({
  find: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
});

describe('AssetService', () => {
  let service: AssetService;
  let assetRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        AssetService,
        {
          provide: AssetRepository,
          useFactory: mockAssetRepository,
        },
      ],
    }).compile();

    assetRepository = module.get<AssetRepository>(AssetRepository);
    service = module.get<AssetService>(AssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(assetRepository).toBeDefined();
  });

  describe('findAll()', () => {
    it('should call findAll method', async () => {
      assetRepository.find.mockResolvedValue([]);
      const findAllSpy = jest.spyOn(service, 'findAll');
      const assets = await service.findAll();

      expect(findAllSpy).toHaveBeenCalled();
      expect(assets).toEqual([]);
    });
  });

  describe('create()', () => {
    let mockCreateAsset: CreateAssetDto;

    beforeEach(() => {
      mockCreateAsset = AssetMock.createAsset();
    });

    it('should create a asset', async () => {
      const response = {
        id: 'mockId',
        ipfsHash: 'mockIpfsHash',
        name: mockCreateAsset.name,
        description: mockCreateAsset.description,
      };

      assetRepository.create.mockResolvedValue();
      assetRepository.save.mockResolvedValue(response);
      service.createIpfs = jest.fn().mockReturnValue(AssetMock.getIpfsReturn());

      service.formatIpfsResponse = jest
        .fn()
        .mockReturnValue(AssetMock.getIpfsReturn());

      const asset = await service.create(mockCreateAsset);

      expect(assetRepository.create).toHaveBeenCalled();
      expect(assetRepository.save).toHaveBeenCalled();
      expect(asset).toEqual(response);
    });

    it('should throw an error if name is not provided', async () => {
      mockCreateAsset.name = undefined;
      expect(service.create(mockCreateAsset)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findById()', () => {
    it('should return an asset', async () => {
      assetRepository.findOne.mockResolvedValue({ id: '2' });
      const findByIdSpy = jest.spyOn(service, 'findById');

      const asset = await service.findById('assetId');

      expect(findByIdSpy).toHaveBeenCalled();
      expect(asset).toHaveProperty('id');
      expect(asset.id).toEqual('2');
    });

    it('should throw an error as asset was not found', async () => {
      assetRepository.findOne.mockResolvedValue(null);

      await expect(service.findById('mockAssetId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByHash()', () => {
    it('should return an asset', async () => {
      assetRepository.findOne.mockResolvedValue({
        ipfsHash: 'mockIpfsHash',
      });
      const findByIdSpy = jest.spyOn(service, 'findByHash');

      const asset = await service.findByHash('mockIpfsHash');

      expect(findByIdSpy).toHaveBeenCalled();
      expect(findByIdSpy).toHaveBeenCalledTimes(1);
      expect(asset).toHaveProperty('ipfsHash', 'mockIpfsHash');
    });

    it('should throw an error as asset was not found', async () => {
      assetRepository.findOne.mockResolvedValue(null);

      await expect(service.findByHash('mockIpfsHash')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
