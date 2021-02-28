import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/library/local-storage';
import { PostService } from '../post.service';

import { io } from "socket.io-client";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  profilePictureUrl = "http://localhost:3000/profile-pictures/";
  postsImageUrl = "http://localhost:3000/posts/";

  createPost = {
    text: ""
  }
  isSettingOpen: boolean = false;
  isNotificationOpen: boolean = false;
  isPostMenuOpen: boolean = false;
  createComment = [];
  httpHeaders: HttpHeaders;
  posts: any[];
  user = this.localStorage.getItem("user");
  imagePost: any = "";
  postForm = new FormData();
  socket;
  notifications: any[];
  @ViewChild('postForm', {static: false})
    postFormElem: ElementRef;

  constructor(
    private postService: PostService,
    private router: Router,
    private localStorage: LocalStorage
  ) { }

  ngOnInit(): void {
    this.getPosts();
    this.setUpConnection();
  }
  
  setUpConnection(){
    this.socket = io("http://localhost:3000", {
      query: {
        token: this.user.token
      }
    });
    this.socket.on('notify-like',function(notifications){
      this.notifications = notifications;
    });
  }

  onFileSelect(files: FileList) {
    if (files.length > 0) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.imagePost = e.target.result;
      };
      reader.readAsDataURL(files[0]);
      this.postForm.append("image", files[0]);
    }
  }

  openNotification(){
    this.isNotificationOpen = !this.isNotificationOpen;       
  }
  
  openPostMenu(){
    this.isPostMenuOpen = !this.isPostMenuOpen;       
  }
  
  openSetting(){
    this.isSettingOpen = !this.isSettingOpen;       
  }
  
  logout(){
    this.localStorage.deleteItem("user");
    this.router.navigate(['/login']);
  }

  private assignPostComments(postId, comments){
    this.posts.find((post) => {
      if(post.id === postId)
        post.comments = comments;
    });
  }

  deletePost(postId){
    this.postService.deletePost(postId).subscribe(
      (res: any) => {
        this.isPostMenuOpen = false;
      },
      (err) => {
        console.log(err);
        this.isPostMenuOpen = false;
      }
    )
  }
  createlike(postId, postUserId){
    this.postService.createLike(postId).subscribe(
      (res: any) => {
        this.socket.emit('create-like', {
          postUserId
        });
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getPostComments(postId) {
    this.postService.getPostComments(postId).subscribe(
      (res: any) => {
        this.assignPostComments(postId, res.data);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  commentOnPost(postId, commentText){
    this.postService.commentOnPost({postId, commentText}).subscribe(
      (res: any) => {
        this.assignPostComments(postId, res.data);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      (res: any) => {
        this.posts = res.data;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  savePost(createPost) {
    this.postForm.append("text", createPost.text);
    this.postService.savePost(this.postForm).subscribe(
      (res) => {
        this.posts = res.data;
        this.imagePost = '';
        this.postFormElem.nativeElement.reset();
      },
      (err) => {
        console.log(err);
        this.imagePost = '';
        this.postFormElem.nativeElement.reset();
      }
    )
  }

}
