import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  private edaURL = 'http://sandbox-eda.lineadecodigo.net/v1';

  async login(email: string, password: string): Promise<string> {
    const response = await axios.post(`${this.edaURL}/auth/login`, {
      email,
      password,
    });
    return response.data.data;
  }

  async registerFile(
    filename: string,
    hash: string,
    token: string
  ): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(
      `${this.edaURL}/transaction/resources/assets`,
      {
        name: filename,
        hash,
      },
      {
        headers,
      }
    );

    return response.data.data;
  }

  async getAsset(assetId: string, token: string): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(
      `${this.edaURL}/transaction/resources/assets/${assetId}`,
      {
        headers,
      }
    );

    return response.data.data;
  }
}
