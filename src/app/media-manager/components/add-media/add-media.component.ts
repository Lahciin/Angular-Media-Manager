import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
// Services
import { MediaService } from '../../services/media.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {

  @Input() reason: string;

  @Output() CloseEvent = new EventEmitter<boolean>();

  @Output() eventAddMedia = new EventEmitter<any>();

  // File upload tag element
  @ViewChild('fileUploader') fileUploader;

  fileToUpload: File;

  accept = '';

  constructor(
    private mediaService: MediaService,
    private alertService: AlertService) { }

  ngOnInit() {
    //  accept="file_extension|audio/*|video/*|image/*|media_type">
  }
  // Fn called when we click the close icon to emit data to parent component
  close() {
    this.CloseEvent.emit(true);
  }

  myUploader(event) {
    this.fileToUpload = event.files[0];
    const formData: FormData = new FormData();
    formData.append('media', this.fileToUpload);
    if (this.reason) {
      formData.append('reason', this.reason);
    }

    this.mediaService.uploadMedia(formData).subscribe(
      res => {
        this.alertService.success('file uploaded successfully ');
        this.eventAddMedia.emit(res.result);
        this.fileUploader.clear();
      }
    );
  }

}
