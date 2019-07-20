import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { VideosComponent } from './videos/videos.component';
import { VideoDetailComponent } from './videos/video-detail/video-detail.component';
import { VideoListComponent } from './videos/video-list/video-list.component';
import { VideoEditComponent } from './videos/video-list/video-edit/video-edit.component';
import { VideoItemComponent } from './videos/video-list/video-item/video-item.component';
import { VideosFilterPipe } from './videos/video-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideosComponent,
    VideoDetailComponent,
    VideoListComponent,
    VideoEditComponent,
    VideoItemComponent,
    VideosFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
