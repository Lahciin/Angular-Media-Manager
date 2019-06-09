import { Component, OnInit, EventEmitter, Output, Input, TemplateRef, ViewChild } from '@angular/core';
// Primeng
import { SelectItem, Paginator } from 'primeng/primeng';
// Services
import { MediaService } from '../../services/media.service';
import { MediaManagerService } from '../../services/media-manager.service';
// Models
import { Media } from '../../models/media.model';
// NGX-Bootstrap
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataView } from 'primeng/dataview';

@Component({
  selector: 'app-media-grid',
  templateUrl: './media-grid.component.html',
  styleUrls: ['./media-grid.component.scss']
})
export class MediaGridComponent implements OnInit {

  @Input() reason: string;

  // Selected media event
  @Output() selectedMediaEvent = new EventEmitter<Media>();
  // media Added Succes Event
  @Input() mediaAddedSucces: EventEmitter<any>;

  @ViewChild('dv') dataView: DataView;

  @ViewChild('paginator') paginator: Paginator;

  // apiUrl = config.apiRoot + 'media/file/';
  apiUrl = 'media/file/';

  // media
  media: Media[];
  selectedMedia: Media;

  displayDialog: boolean;

  sortOptions: SelectItem[];

  sortKey: string;

  typeOptions: SelectItem[];

  typeKey: string;

  sortField: string;

  sortOrder: number;

  totalRecords: number;

  // update, Delete buttons ;
  modalRef: BsModalRef;

  constructor(
    private mediaManagerService: MediaManagerService,
    private mediaService: MediaService,
    private modalService: BsModalService) { }

  ngOnInit() {

    this.typeOptions = [
      { label: 'All types', value: null },
      { label: 'Image/PNG', value: 'image/png' },
      { label: 'Image/JPEG', value: 'image/jpeg' },
      { label: 'PDF', value: 'application/pdf' },
    ];

    this.mediaAddedSucces.subscribe(
      res => this.loadData(0)
    );

    this.mediaManagerService.checkedMedia.subscribe(
      res => {
        this.selectedMedia = res;
      });
  }

  selectMedia(event: Event, media: Media) {
    if ((this.selectedMedia !== null) && (this.selectedMedia !== undefined) && (this.selectedMedia._id === media._id)) {
      this.selectedMedia = null;
      this.selectedMediaEvent.emit(null);
    } else {
      this.selectedMedia = media;
      // emit new value
      this.selectedMediaEvent.emit(this.selectedMedia);
      // emit new value
    }
    event.preventDefault();
  }

  onTypeChange(event) {
    this.typeKey = event.value;
    this.loadData(0);
  }

  isSelected(media) {
    if (this.selectedMedia) {
      return media._id === this.selectedMedia._id;
    } else {
      return false;
    }
  }

  async loadData(event) {
    const limit = 12;
    const page = (event.first / limit) + 1;
    // this.mediaService.getMedia(page, limit, type, reason).subscribe(
    const res = await this.mediaService.getMedia(page, limit, this.typeKey, this.reason).toPromise();
    this.media = res.docs;
    this.totalRecords = res.total;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  onDelete(confirmDelete, _id) {
    if (confirmDelete) {
      (async () => {
        const del = await this.mediaService.deleteMedia(_id).toPromise();
        if (del) {
          (async () => {
            await this.loadData(0);
            await this.paginator.changePage(this.paginator.getPage());
          })();

          // change the selected media to null
          this.selectedMedia = null;
          this.selectedMediaEvent.emit(null);
        }
      })();
    }
    this.modalRef.hide();
  }

}
