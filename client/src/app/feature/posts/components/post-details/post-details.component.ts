import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { ButtonComponent } from '../../../../shared/button/button.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    DatePipe,
    CommentFormComponent,
    CommentListComponent,
    ButtonComponent,
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss',
})
export class PostDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postsService = inject(PostsService);
  private authService = inject(AuthService);

  currentUser = this.authService.currentUser;
  post = this.postsService.selectedPost;
  comments = this.postsService.comments;
  commentsTotalCount = this.postsService.commentsTotalCount;
  currentPage = signal(1);
  maxPages = computed(() => Math.ceil(this.commentsTotalCount() / 10));

  ngOnInit() {
    const postId = this.route.snapshot.params.id;

    this.postsService.getPostById(postId);
  }

  onAddComment(text: string) {
    this.currentPage.set(1);
    this.postsService.createPostComment(
      this.currentUser().id,
      this.post().id,
      text
    );
  }

  onLoadmore() {
    this.currentPage.update((prev) => prev + 1);

    this.postsService.getPostComments(
      this.post().id,
      (this.currentPage() - 1) * 10 + 1,
      10
    );
  }
}
