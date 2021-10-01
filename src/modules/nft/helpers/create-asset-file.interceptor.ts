import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { generateFileName, imageFileFilter } from '../../../shared/multer';

export const createAssetFileInterceptor = () =>
  FileFieldsInterceptor([{ name: 'asset', maxCount: 1 }], {
    fileFilter: imageFileFilter,
    storage: diskStorage({
      destination: './uploads',
      filename: generateFileName,
    }),
  });
