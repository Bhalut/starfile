import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';

import * as CryptoJS from 'crypto-js';

import { BlockchainService } from '../../services/blockchain.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.sass',
})
export class FileUploadComponent {
  files: File[] = [];
  hash: string = '';

  constructor(private blockchainService: BlockchainService) {}

  onSelect(event: any) {
    console.log('File selected:', event);
    this.files.push(...event.addedFiles);
    this.generateChecksum();
  }

  onRemove(event: any) {
    console.log('File removed:', event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  fileBrowseHandler(event: any) {
    console.log('File selected via input:', event);
    if (event.target.files && event.target.files.length > 0) {
      this.files.push(...event.target.files);
      this.generateChecksum();
    } else {
      console.error('No files selected via input');
    }
  }

  generateChecksum() {
    const file = this.files[0];
    console.log('Generating checksum for file:', file);

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
        const hash = CryptoJS.SHA256(wordArray).toString();
        console.log('Generated hash:', hash);
        this.hash = hash;
        this.blockchainService.registerFile(file.name, hash);
      };

      reader.onerror = (error) => {
        console.error('FileReader error:', error);
      };

      reader.readAsArrayBuffer(file);
    } else {
      console.error('No file selected');
    }
  }
}
