import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Video } from './video.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videos: Video[] = [];
  videoSelectedEvent: EventEmitter<Video> = new EventEmitter<Video>();
  videoChangedEvent: EventEmitter<Video[]> = new EventEmitter<Video[]>();
  videoListChangedEvent: Subject<Video[]> = new Subject<Video[]>();
  maxVideoID: number;

  constructor(private http: HttpClient) { 
    this.getVideos();
  }

  getVideos(): void {
    this
    .http
    .get<{message: string, videos: Video[]}>('http://localhost:3000/video')
    .subscribe((response: any) => {
      this.videos = response.videos;
      this.maxVideoID = this.getMaxID();
      this.videos.sort(compareVideosByID);
      this.videoListChangedEvent.next(this.videos.slice());
    }, (err: any) => {
      console.error(err);
    });
  }

  getVideo(id: string): Video {
    if (!this.videos) {
      return null;
    }

    for (let video of this.videos) {
      if (video.id === id) {
        return video;
      }
    }

    return null;
  }

  getMaxID(): number {
    let maxID = 0;
    for (let video of this.videos) {
      let currentID = +video.id;
      if (currentID > maxID) {
        maxID = currentID;
      }
    }

    return maxID;
  }

  addVideo(video: Video): void {
    if (!video) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    video.id = '';

    this.http
    .post<{message: string, video: Video}>('http://localhost:3000/video', video, {headers: headers})
    .subscribe((response: any) => {
      this.videos.push(response.video);
      this.videos.sort(compareVideosByID);
      this.videoChangedEvent.next(this.videos.slice());
    });
  }

  updateVideo(originalVideo: Video, newVideo: Video): void {
    if (!originalVideo || !newVideo) {
      return;
    }

    let index = this.videos.indexOf(originalVideo);
    if (index < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strVideo = JSON.stringify(newVideo);

    this.http
    .put<{message: string}>(`http://localhost:3000/video/${originalVideo.id}`, strVideo, {headers: headers})
    .subscribe((response: any) => {
      this.getVideos();
    });
  }

  deleteVideo(video: Video): void {
    if (!video) {
      return;
    }

    const index = this.videos.indexOf(video);
    if (index < 0) {
      return;
    }

    this.http.delete(`http://localhost:3000/video/${video.id}`)
    .subscribe((videos: Video[]) => {
      this.getVideos();
    })
  }

  storeVideos(): void {
    let json = JSON.stringify(this.videos);
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this
    .http
    .put<{message: string}>('http://localhost:3000/video', json, {
      headers: header
    }).subscribe(() => {
      this.videoListChangedEvent.next(this.videos.slice());
    });
  }
}

function compareVideosByID(lhs: Video, rhs: Video): number {
  if (lhs.id < rhs.id) {
    return -1;
  } else if (lhs.id === rhs.id) {
    return 0;
  } else {
    return 1;
  }
}
