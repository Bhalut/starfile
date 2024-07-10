import { TestBed } from '@angular/core/testing';
import { BlockchainService } from './blockchain.service';
import axios from 'axios';

describe('BlockchainService', () => {
  let service: BlockchainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockchainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and get a token', async () => {
    const mockResponse = { data: { data: 'mockToken' } };
    spyOn(axios, 'post').and.returnValue(Promise.resolve(mockResponse));

    const token = await service.login('test@example.com', 'testpassword');
    expect(token).toBe('mockToken');
  });

  it('should register a file', async () => {
    const mockResponse = { data: { success: true } };
    spyOn(axios, 'post').and.returnValue(Promise.resolve(mockResponse));

    const response = await service.registerFile('test.pdf', 'fakehash', 'mockToken');
    expect(response).toEqual(mockResponse.data);
  });

  it('should get asset details', async () => {
    const mockResponse = { data: { data: 'mockAssetDetails' } };
    spyOn(axios, 'get').and.returnValue(Promise.resolve(mockResponse));

    const assetDetails = await service.getAsset('mockAssetId', 'mockToken');
    expect(assetDetails).toBe('mockAssetDetails');
  });
});
