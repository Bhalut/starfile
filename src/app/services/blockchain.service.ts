import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  private edaURL = 'https://eda.api.endpoint';

  async registerFile(filename: string, hash: string) {
    const response = await axios.post(`${this.edaURL}/register`, {
      filename,
      hash,
    });

    return response.data;
  }
}
