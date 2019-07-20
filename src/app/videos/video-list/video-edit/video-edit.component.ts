import { Component, OnInit } from '@angular/core';
import { Video } from '../../video.model';
import { VideoService } from '../../video.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {
  originalVideo: Video;
  video: Video = null;
  groupVideos: Video[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  invalidGroupVideo: boolean = false;

  constructor(
    private videoService: VideoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editMode = false;
      let id = params['id'];
      if (id === null || id === undefined) {
        return;
      }
      
      let video = this.videoService.getVideo(id);
      if (!video) {
        return;
      }

      this.originalVideo = video;
      this.editMode = true;
      this.video = JSON.parse(JSON.stringify(video));
    });
  }

  onSubmit(form: NgForm) {
    let video = new Video(
      form.value.id,
      form.value.name, 
      form.value.email, 
      form.value.imageUrl
    );
    if (this.editMode === true) {
      this.videoService.updateVideo(this.originalVideo, video);
    } else {
      this.videoService.addVideo(video);
    }

    this.router.navigate(['/videos']);
  }

  onCancel() {
    this.router.navigate(['/videos']);
  }

  isInvalidVideo(newVideo: Video) {
    if (!newVideo) {
      return true;
    }

    if (newVideo.id === this.video.id) {
      return true;
    }

    for (let i = 0; i < this.groupVideos.length; i++) {
      if (newVideo.id === this.groupVideos[i].id) {
        return true;
      }
    }

    return false;
  }

  addToGroup($event: any) {
    let selectedVideo: Video = $event.dragData;
    this.invalidGroupVideo = this.isInvalidVideo(selectedVideo);
    if (this.invalidGroupVideo) {
      return;
    }
    this.groupVideos.push(selectedVideo);
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx > this.groupVideos.length) {
      return;
    }

    this.groupVideos.splice(idx, 1);
    this.invalidGroupVideo = false;
  }
}
