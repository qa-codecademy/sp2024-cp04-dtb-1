import { User } from '../../auth/models/auth.model';

export interface Post {
  id: number;
  title: string;
  text: string;
  image: string;
  date: string;
  tags: string[];
  ratings: number[];
  comments: string[];
  user: User;
}

export interface PostRequest {
  title: string;
  text: string;
  image: string;
  tags: string[];
  user: string;
}
