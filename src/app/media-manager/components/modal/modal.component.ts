import { Component, OnInit, OnDestroy, ElementRef, EventEmitter, Input, Output } from '@angular/core';
// Services
import { MediaManagerService } from '../../services/media-manager.service';
// Models
import { Media } from '../../models/media.model';

@Component({
  selector: 'media-manager-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit, OnDestroy {

  @Input() reason: string;

  id = 'media-manager-modal';

  private element: any;

  // the selected media to be shared in the service
  selectedMedia: Media;

  addMediaToggle = false;

  // media Added Event
  mediaAddedSucces = new EventEmitter<any>();

  constructor(
    private mediaManagerService: MediaManagerService,
    private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    const modal = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'modal') {
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.mediaManagerService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.mediaManagerService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  closeModal(id: string) {
    this.mediaManagerService.close(id);
  }

  // Send data to the service
  validate(id: string) {
    this.mediaManagerService.close(id);
    this.mediaManagerService.addSelectedMedia(this.selectedMedia);
  }

  // receive the selected user
  receiveSelectedMedia(mediaSelected: Media) {
    this.selectedMedia = mediaSelected;
  }

  // Onclick toggle addmedia component
  toggleAddMedia() {
    this.addMediaToggle = !this.addMediaToggle;
  }

  // Onclick toggle addmedia component
  mediaAddedEvent(media) {
    this.mediaAddedSucces.emit(media);
  }
}

