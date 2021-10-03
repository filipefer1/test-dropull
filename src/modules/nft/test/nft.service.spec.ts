import { Test, TestingModule } from '@nestjs/testing';
import { CreateNftDto } from '../dtos/create-nft.dto';
import { NftRepository } from '../repositories/nft.repository';
import { AssetService } from '../services/asset.service';
import { NftService } from '../services/nft.service';

const mockNftRepository = () => ({
  find: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});

const mockAssetService = () => ({
  findById: jest.fn(),
});

describe('NftService', () => {
  let service: NftService;
  let assetService: AssetService;
  let nftRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NftService,
        {
          provide: NftRepository,
          useFactory: mockNftRepository,
        },
        {
          provide: AssetService,
          useValue: mockAssetService,
        },
      ],
    }).compile();

    nftRepository = module.get<NftRepository>(NftRepository);
    service = module.get<NftService>(NftService);
    assetService = module.get<AssetService>(AssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(nftRepository).toBeDefined();
    expect(assetService).toBeDefined();
  });

  describe('findAll()', () => {
    it('should call findAll method', async () => {
      nftRepository.find.mockResolvedValue('mockNfts');
      const findAllSpy = jest.spyOn(service, 'findAll');
      const nfts = await service.findAll();

      expect(findAllSpy).toHaveBeenCalled();
      expect(nfts).toEqual('mockNfts');
    });
  });

  describe('create()', () => {
    let mockCreateNftDto: CreateNftDto;

    beforeEach(() => {
      mockCreateNftDto = {
        assetId: 'mockAssetId',
        quantity: 1,
      };
    });

    it('should create a nft', async () => {
      nftRepository.create.mockResolvedValue({ id: 'mockNftId' });
      nftRepository.save.mockResolvedValue('mockNft');
      assetService.findById = jest.fn().mockReturnValue({});

      const nft = await service.create(mockCreateNftDto);

      expect(nftRepository.create).toHaveBeenCalled();
      expect(nftRepository.save).toHaveBeenCalled();
      expect(nft).toEqual('mockNft');
    });

    it('should throw an error if quantity is equal or less than 0', async () => {
      mockCreateNftDto.quantity = 0;
      expect(service.create(mockCreateNftDto)).rejects.toThrow(TypeError);
    });

    it('should throw an error if assetId is not provided', async () => {
      mockCreateNftDto.assetId = undefined;
      expect(service.create(mockCreateNftDto)).rejects.toThrow(TypeError);
    });
  });
});
