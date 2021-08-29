import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  panelOpenState: boolean = false;
  // posts = [
  //   { title: 'First Post', content: 'This is the first post\'s content' },
  //   { title: 'Second Post', content: 'This is the second post\'s content' },
  //   { title: 'Third Post', content: 'This is the third post\'s content' }
  // ];
  posts: Post[] = [];
  private postsSub?: Subscription;
  isLoading: boolean = false;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
}
