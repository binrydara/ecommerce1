import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileuploadPageRoutingModule } from './fileupload-routing.module';

import { FileuploadPage } from './fileupload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FileuploadPageRoutingModule
  ],
  declarations: [FileuploadPage]
})
export class FileuploadPageModule {}
