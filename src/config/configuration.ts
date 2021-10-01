import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  JWT_CONSTANTS: {
    representantesSecret: process.env.JWT_REPRESENTANTES_SECRET || 'secretKey',
    secret: process.env.JWT_SECRET || 'secretKey',
    expireIn: '1d',
  },
  PINATA: {
    acess_token: process.env.PINATA_JWT_TOKEN,
    url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
  },
};
