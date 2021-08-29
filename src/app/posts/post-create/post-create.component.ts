import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "src/app/models/post.model";
import { PostsService } from "src/app/services/posts.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle: string = '';
  enteredContent: string = '';
  post?: Post;
  private mode = 'create';
  private postId?: string | null;
  isLoading: boolean = false;

  constructor(
    private postService: PostsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if(paramMap.has('postId')) {
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          this.isLoading = true;
          this.postService.getPost(this.postId!)
            .subscribe(postData => {
              this.isLoading = false;
              this.post = {
                id: postData._id,
                title: postData.title,
                content: postData.content
              };
            });
        }
        else {
          this.mode = 'create';
          this.postId = null;
        }
      });

  }

  onSavePost(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content);
    }
    else {
      this.postService.updatePost(this.postId!, form.value.title, form.value.content);
    }
    form.resetForm();
  }
}
