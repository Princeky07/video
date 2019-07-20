import { Component, OnInit } from '@angular/core';
import { Video } from '../video.model';
import { VideoService } from '../video.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['../../app.component.css', './video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  video: Video;

  constructor(
    private videoService: VideoService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.video = this.videoService.getVideo(params['id']);
    });
  }

  onDelete() {
    this.videoService.deleteVideo(this.video);
    this.router.navigate(['/videos']);
  }
}
