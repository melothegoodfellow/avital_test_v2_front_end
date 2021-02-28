import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorage } from '../library/local-storage';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postUrl = "http://localhost:3000/post";
  postCommentUrl = "/comment";
  postLikeUrl = "/like";
  httpHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorage
  ) { }
  
    
  deletePost(postId: any) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type':  "application/json",
      "Authorization": "Bearer "+this.localStorage.getItem("user").token
    });
    return this.http.put(this.postUrl, {
      postId
    },  {
      headers: this.httpHeaders
    });
  }

  createLike(postId) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type':  "application/json",
      "Authorization": "Bearer "+this.localStorage.getItem("user").token
    });
    return this.http.post(this.postUrl+'/'+postId+this.postLikeUrl, {},  {
      headers: this.httpHeaders
    });
  }

  getPostComments(postId) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type':  "application/json",
      "Authorization": "Bearer "+this.localStorage.getItem("user").token
    });
    return this.http.get(this.postUrl+'/'+postId+this.postCommentUrl, {
      headers: this.httpHeaders
    });
  }

  commentOnPost({postId, commentText}) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type':  "application/json",
      "Authorization": "Bearer "+this.localStorage.getItem("user").token
    });
    return this.http.post(this.postUrl+'/'+postId+this.postCommentUrl, { commentText },  {
      headers: this.httpHeaders
    });
  }

  getPosts() {
    this.httpHeaders = new HttpHeaders({
      'Content-Type':  "application/json",
      "Authorization": "Bearer "+this.localStorage.getItem("user").token
    });
    return this.http.get(this.postUrl, {
      headers: this.httpHeaders
    });
  }

  savePost(post: any): Observable<any>{
    this.httpHeaders = new HttpHeaders({
      "Authorization": "Bearer "+this.localStorage.getItem("user").token
    });
    return this.http.post(this.postUrl, post,  {
      headers: this.httpHeaders
    });
  }
}
