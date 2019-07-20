import {Injectable} from '@angular/core';

@Injectable()
export class Video {
    constructor(
        public id: string,
        public title: string,
        public subtitle: string,
        public imageUrl: string) {
    }
}