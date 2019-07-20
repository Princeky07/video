import { Component, OnInit, OnDestroy } from '@angular/core';

import { Video } from '../video.model';
import { VideoService } from '../video.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['../../app.component.css', './video-list.component.css']
})
export class VideoListComponent implements OnInit, OnDestroy {
  videos: Video[] = [];
  subscription: Subscription;
  term: string;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videoService.videoChangedEvent.subscribe((videos) => {
      this.videos = videos.slice();
    });

    this.subscription = this.videoService.videoListChangedEvent.subscribe((video: Video[]) => {
      this.videos = video;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string) {
    this.term = value;
  }
}
