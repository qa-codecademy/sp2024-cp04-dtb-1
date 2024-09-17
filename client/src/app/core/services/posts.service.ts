import { inject, Injectable, OnInit, signal } from '@angular/core';
import { PostsApiService } from './posts-api.service';
import { Post, PostComment } from '../../feature/posts/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiService = inject(PostsApiService);

  posts = signal<Post[]>([]);
  totalPostCount = signal<number>(0);
  selectedPost = signal<Post>(null);
  commentsTotalCount = signal(0);
  comments = signal<PostComment[]>([]);

  getPosts(firstResult: number = 1, maxResults: number = 10) {
    return this.apiService.fetchAllPosts(firstResult, maxResults).subscribe({
      next: (response) => {
        this.posts.update((prev) => [...prev, ...response.posts]);
        this.totalPostCount.set(response.totalCount);
      },
      error: (err) => console.log(err),
    });
  }

  getPostById(postId: number) {
    this.apiService.fetchPostById(postId).subscribe({
      next: (res) => {
        this.selectedPost.set(res);
        this.comments.set([]);
        this.getPostComments(postId);
      },
      error: (error) => console.log(error),
    });
  }

  getPostComments(
    postId: number,
    firstResult: number = 1,
    maxResults: number = 10
  ) {
    this.apiService
      .fetchPostComments(postId, firstResult, maxResults)
      .subscribe({
        next: (value) => {
          this.comments.update((prev) => [...prev, ...value.comments]);
          this.commentsTotalCount.set(value.totalCount);
        },
        error: (error) => console.log(error),
      });
  }

  createPostComment(userId: string, postId: number, text: string) {
    this.apiService.postComment(userId, postId, text).subscribe({
      next: () => {
        this.comments.set([]);
        this.getPostComments(postId);
      },
      error: (error) => console.log(error),
    });
  }
}
