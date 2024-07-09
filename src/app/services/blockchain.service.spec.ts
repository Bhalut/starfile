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

  it('should register file', async () => {
    const mockResponse = { data: { success: true } };
    spyOn(axios, 'post').and.returnValue(Promise.resolve(mockResponse));

    const response = await service.registerFile('test.pdf', 'fakehash');
    expect(response).toEqual(mockResponse.data);
  });
});
