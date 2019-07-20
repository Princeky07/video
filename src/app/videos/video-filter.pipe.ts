import { Pipe, PipeTransform } from '@angular/core';
import { Video } from './video.model';

@Pipe({
  name: 'videosFilter'
})
export class VideosFilterPipe implements PipeTransform {

  transform(videos: Video[], term: string): Video[] {
    if (!videos.length || !term) {
      return videos;
    }

    term = term.trim().toLowerCase();

    let filtered = videos.filter((video: Video) => {
      return video.title.toLowerCase().includes(term);
    });

    if (!filtered.length) {
      return null;
    }

    return filtered;
  }
}
