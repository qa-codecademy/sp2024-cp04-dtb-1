import { Component } from '@angular/core';
import { PostsListComponent } from '../posts/components/posts-list/posts-list.component';
import { TrandingPostsListComponent } from '../posts/components/tranding-posts-list/tranding-posts-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostsListComponent, TrandingPostsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
