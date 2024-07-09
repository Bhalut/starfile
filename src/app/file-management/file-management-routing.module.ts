import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  { path: 'upload', component: FileUploadComponent },
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FileUploadComponent],
  exports: [RouterModule],
})
export class FileManagementRoutingModule {}
