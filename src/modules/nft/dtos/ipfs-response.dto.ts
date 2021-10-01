export class IpfsResponseDto {
  IpfsHash: string;
  PinSize: number;
  Timestamp: Date;
  isDuplicate?: boolean;
}
