import {Song} from './song.interface';

export interface Post {
    user: string;
    likes: number;
    song: Song;
}
