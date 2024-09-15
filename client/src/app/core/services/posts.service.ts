import { inject, Injectable, OnInit, signal } from '@angular/core';
import { PostsApiService } from './posts-api.service';
import { Post } from '../../feature/posts/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiService = inject(PostsApiService);

  posts = signal<Post[]>([]);
  selectedPost = signal<Post>(null);

  getPosts() {
    return this.apiService.fetchAllPosts().subscribe({
      next: (response) => {
        this.posts.set(response);
      },
      error: (err) => console.log(err),
    });
  }

  getPostById(postId: number) {
    this.apiService.fetchPostById(postId).subscribe({
      next: (res) => {
        this.selectedPost.set(res);
      },
      error: (error) => console.log(error),
    });
  }
}
