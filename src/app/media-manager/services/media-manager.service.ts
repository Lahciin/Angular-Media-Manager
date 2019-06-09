import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Media } from '../models/media.model';

@Injectable({
  providedIn: 'root'
})
export class MediaManagerService {

  private modals: any[] = [];

  private selectedMedia = new Subject<Media>();

  public checkedMedia = new Subject<Media>();

  add(modal: any) {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(id: string) {
    // remove modal from array of active modals
    this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string, checkedMedia: Media) {
    // open modal specified by id
    const modal: any = this.modals.filter(x => x.id === id)[0];
    // emit checked media value
    this.checkedMedia.next(checkedMedia);
    modal.open();
  }

  close(id: string) {
    // close modal specified by id
    const modal: any = this.modals.filter(x => x.id === id)[0];
    // emit checked media value
    this.checkedMedia.next(null);
    modal.close();
  }

  // media functions
  addSelectedMedia(media: Media) {
    this.selectedMedia.next(media);
  }

  getSelectedMedia(): Subject<Media> {
    return this.selectedMedia;
  }

}
