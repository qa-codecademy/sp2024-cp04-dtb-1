import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postsService = inject(PostsService);

  post = this.postsService.selectedPost;

  ngOnInit() {
    const postId = this.route.snapshot.params.id;

    this.postsService.getPostById(postId);
  }
}
