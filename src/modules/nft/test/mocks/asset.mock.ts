export class AssetMock {
  static createAsset() {
    return {
      name: 'mockAssetName',
      asset: 'mockAssetDestination',
      description: 'mockAssestDescription',
    };
  }

  static getIpfsReturn() {
    return {
      IpfsHash: 'mockIpfsHash',
      PinSize: 'mockPinSize',
      Timestamp: 'mockTimestamp',
    };
  }
}
