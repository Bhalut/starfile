import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule } from '@angular/forms';

import * as CryptoJS from 'crypto-js';

import { BlockchainService } from '../../services/blockchain.service';

import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let mockBlockchainService: any;

  beforeEach(async () => {
    mockBlockchainService = jasmine.createSpyObj([
      'login',
      'registerFile',
      'getAsset',
    ]);
    mockBlockchainService.login.and.returnValue(Promise.resolve('mockToken'));
    mockBlockchainService.registerFile.and.returnValue(
      Promise.resolve({ success: true })
    );
    mockBlockchainService.getAsset.and.returnValue(
      Promise.resolve('mockAssetDetails')
    );

    await TestBed.configureTestingModule({
      imports: [FileUploadComponent, NgxDropzoneModule, FormsModule],
      providers: [
        { provide: BlockchainService, useValue: mockBlockchainService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle file dropped', async () => {
    const mockFile = new File(['test'], 'test.pdf', {
      type: 'application/pdf',
    });

    spyOn(component, 'generateChecksum').and.callThrough();

    component.onSelect({ addedFiles: [mockFile] });

    expect(component.files).toContain(mockFile);
    expect(component.generateChecksum).toHaveBeenCalled();
  });

  it('should handle file selected via input', async () => {
    const mockFile = new File(['test'], 'test.pdf', {
      type: 'application/pdf',
    });

    spyOn(component, 'generateChecksum').and.callThrough();

    const event = {
      target: {
        files: [mockFile],
      },
    };

    component.fileBrowseHandler(event);

    expect(component.files).toContain(mockFile);
    expect(component.generateChecksum).toHaveBeenCalled();
  });

  it('should generate checksum', async () => {
    const mockFile = new File(['test'], 'test.pdf', {
      type: 'application/pdf',
    });
    component.files = [mockFile];

    const self = {
      readAsArrayBuffer: jasmine
        .createSpy('readAsArrayBuffer')
        .and.callFake(function (this: FileReader) {
          self.onload({ target: { result: new ArrayBuffer(8) } });
        }),
      result: new ArrayBuffer(8),
      onload: null as any,
      onerror: null as any,
    };

    spyOn(window as any, 'FileReader').and.returnValue(
      self as unknown as FileReader
    );

    component.generateChecksum();

    fixture.detectChanges();

    const expectedHash = CryptoJS.SHA256(
      CryptoJS.lib.WordArray.create(self.result)
    ).toString();

    expect(component.hash).toBe(expectedHash);
  });

  it('should login and upload file', async () => {
    component.email = 'test@example.com';
    component.password = 'testpassword';
    component.files = [
      new File(['test'], 'test.pdf', { type: 'application/pdf' }),
    ];
    component.hash = 'mockHash';

    await component.login();
    await component.uploadFile();

    expect(mockBlockchainService.login).toHaveBeenCalledWith(
      'test@example.com',
      'testpassword'
    );
    expect(mockBlockchainService.registerFile).toHaveBeenCalledWith(
      'test.pdf',
      'mockHash',
      'mockToken'
    );
  });

  it('should get asset details', async () => {
    component.assetId = 'mockAssetId';
    component.token = 'mockToken';

    await component.getAsset();

    expect(mockBlockchainService.getAsset).toHaveBeenCalledWith(
      'mockAssetId',
      'mockToken'
    );
    expect(component.assetDetails).toBe('mockAssetDetails');
  });
});
