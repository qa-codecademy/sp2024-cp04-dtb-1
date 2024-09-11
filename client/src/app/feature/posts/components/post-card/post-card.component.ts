import { Component, input } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  post = input.required<Post>();
}
