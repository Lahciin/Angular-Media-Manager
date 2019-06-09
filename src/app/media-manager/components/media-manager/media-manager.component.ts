import { Component, OnInit, Input } from '@angular/core';
import { MediaManagerService } from '../../services/media-manager.service';

@Component({
  selector: 'app-media-manager',
  templateUrl: './media-manager.component.html',
  styleUrls: ['./media-manager.component.scss']
})

export class MediaManagerComponent implements OnInit {

  @Input() reason: string;

  constructor(private mediaManagerService: MediaManagerService) { }

  ngOnInit() {
  }

  openModal(id: string) {
    this.mediaManagerService.open(id, null);
  }
}
