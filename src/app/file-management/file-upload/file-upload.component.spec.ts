import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxDropzoneModule } from 'ngx-dropzone';

import * as CryptoJS from 'crypto-js';

import { BlockchainService } from '../../services/blockchain.service';

import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let mockBlockchainService: any;

  beforeEach(async () => {
    mockBlockchainService = jasmine.createSpyObj(['registerFile']);
    mockBlockchainService.registerFile.and.returnValue(
      Promise.resolve({ success: true })
    );

    await TestBed.configureTestingModule({
      imports: [FileUploadComponent, NgxDropzoneModule],
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

    expect(mockBlockchainService.registerFile).toHaveBeenCalled();
  });
});
