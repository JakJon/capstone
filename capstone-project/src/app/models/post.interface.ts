import {Song} from './song.interface';

export interface Post {
    user: string;
    description: string;
    likes: number;
    song: Song;
}
