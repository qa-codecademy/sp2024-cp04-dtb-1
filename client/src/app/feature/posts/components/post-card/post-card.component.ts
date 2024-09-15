import { Component, inject, input } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  private router = inject(Router);
  post = input.required<Post>();

  onLoadMoreClick() {
    this.router.navigate([`post-details/${this.post().id}`]);
  }
}
