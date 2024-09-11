import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../conststants/core.conststants';
import { Post } from '../../feature/posts/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsApiService {
  private http = inject(HttpClient);
  constructor() {}

  fetchAllPosts() {
    return this.http.get<Post[]>(`${BASE_URL}/posts`);
  }
}
