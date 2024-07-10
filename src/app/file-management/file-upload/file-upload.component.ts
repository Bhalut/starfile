import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDropzoneModule } from 'ngx-dropzone';

import * as CryptoJS from 'crypto-js';

import { BlockchainService } from '../../services/blockchain.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule, FormsModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.sass',
})
export class FileUploadComponent {
  files: File[] = [];
  hash: string = '';
  email: string = '';
  password: string = '';
  token: string = '';
  assetId: string = '';
  assetDetails: string = '';
  loginMessage: { success: boolean; message: string } | null = null;
  uploadMessage: { success: boolean; message: string } | null = null;
  getAssetMessage: { success: boolean; message: string } | null = null;

  constructor(private blockchainService: BlockchainService) {}

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.generateChecksum();
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  fileBrowseHandler(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.files.push(...event.target.files);
      this.generateChecksum();
    } else {
      this.loginMessage = {
        success: false,
        message: 'No files selected via input',
      };
    }
  }

  generateChecksum() {
    const file = this.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
        const hash = CryptoJS.SHA256(wordArray).toString();

        this.hash = hash;
      };

      reader.onerror = (error) => {
        this.loginMessage = { success: false, message: 'FileReader error' };
      };

      reader.readAsArrayBuffer(file);
    } else {
      this.loginMessage = { success: false, message: 'No file selected' };
    }
  }

  async login() {
    try {
      this.token = await this.blockchainService.login(
        this.email,
        this.password
      );

      this.loginMessage = { success: true, message: 'Logged in successfully' };
    } catch (error) {
      this.loginMessage = { success: false, message: 'Login failed' };
    }
  }

  async uploadFile() {
    if (this.files.length > 0 && this.hash && this.token) {
      try {
        await this.blockchainService.registerFile(
          this.files[0].name,
          this.hash,
          this.token
        );

        this.uploadMessage = {
          success: true,
          message: 'File uploaded to blockchain',
        };
      } catch (error) {
        this.uploadMessage = { success: false, message: 'File upload failed' };
      }
    } else {
      this.uploadMessage = {
        success: false,
        message: 'Please select a file, generate a checksum, and login first',
      };
    }
  }

  async getAsset() {
    if (this.assetId && this.token) {
      try {
        this.assetDetails = await this.blockchainService.getAsset(
          this.assetId,
          this.token
        );
        this.getAssetMessage = {
          success: true,
          message: 'Asset details retrieved',
        };
      } catch (error) {
        this.getAssetMessage = {
          success: false,
          message: 'Failed to retrieve asset details',
        };
      }
    } else {
      this.getAssetMessage = {
        success: false,
        message: 'Please enter an asset ID and login first',
      };
    }
  }
}
