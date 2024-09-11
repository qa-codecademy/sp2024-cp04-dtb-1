import { inject, Injectable, OnInit, signal } from '@angular/core';
import { PostsApiService } from './posts-api.service';
import { Post } from '../../feature/posts/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiService = inject(PostsApiService);

  posts = signal<Post[]>([]);

  getPosts() {
    return this.apiService.fetchAllPosts().subscribe({
      next: (response) => {
        console.log(response);
        this.posts.set(response);
      },
      error: (err) => console.log(err),
    });
  }
}
