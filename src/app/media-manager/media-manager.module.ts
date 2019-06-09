import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaManagerComponent } from './components/media-manager/media-manager.component';
import { ModalComponent } from './components/modal/modal.component';

import { MediaManagerRoutingModule } from './media-manager-routing.module';
import { DataViewModule } from 'primeng/dataview';
import { MediaGridComponent } from './components/media-grid/media-grid.component';

import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { PaginatorModule } from 'primeng/paginator';

import { FormsModule } from '@angular/forms';
import { MediaService } from './services/media.service';
import { AddMediaComponent } from './components/add-media/add-media.component';




@NgModule({
  declarations: [ModalComponent, MediaManagerComponent, MediaGridComponent, AddMediaComponent],
  imports: [
    CommonModule,
    MediaManagerRoutingModule,
    DataViewModule,
    DropdownModule,
    PanelModule,
    DialogModule,
    FormsModule,
    FileUploadModule,
    PaginatorModule
  ],
  exports: [
    MediaManagerComponent,
    MediaGridComponent,
    AddMediaComponent,
    ModalComponent
  ],
  entryComponents: [
    ModalComponent,
    MediaManagerComponent,
    MediaGridComponent
  ],
  providers: [MediaService]
})
export class MediaManagerModule { }
