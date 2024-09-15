import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { PostCardComponent } from '../post-card/post-card.component';
import { SearchPipe } from '../../../../core/pipes/search.pipe';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [PostCardComponent, SearchPipe],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
})
export class PostsListComponent implements OnInit {
  private postsService = inject(PostsService);

  posts = this.postsService.posts;
  searchValue = input<string>();

  ngOnInit(): void {
    this.postsService.getPosts();
  }
}
