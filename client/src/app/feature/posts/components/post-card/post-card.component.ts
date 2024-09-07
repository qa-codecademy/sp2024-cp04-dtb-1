import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/button/button.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {}
