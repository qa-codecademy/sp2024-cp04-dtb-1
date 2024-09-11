import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { PostCardComponent } from '../post-card/post-card.component';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [PostCardComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
})
export class PostsListComponent implements OnInit {
  private postsService = inject(PostsService);

  posts = this.postsService.posts;

  ngOnInit(): void {
    this.postsService.getPosts();
  }
}
