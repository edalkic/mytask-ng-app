import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { LocalStorageService } from "angular-2-local-storage";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {
  postModel: UserPostViewModel = {
    id: 0,
    imageString: '',
    title: '',
    explanation: '',
    userId: this.localStorageService.get("userId")
  };

  posts: any;
  userCount: number = this.localStorageService.get("userCount");
  imgUrl: any;
  base64textString: String="";
  constructor(private http: HttpClient,
              private localStorageService : LocalStorageService,
              private router: Router,
              private sanitizer: DomSanitizer) { }

  public deletePost(id: number) {
    let url = "http://localhost:8080/posts/delete?postId=" + id;
    let result = this.http.delete(url);

    let url2 = "http://localhost:8080/posts/my?userId=" + this.localStorageService.get("userId");
    let result2 = this.http.get(url);
    result2.subscribe((data)=> this.posts = data);
  }
  public transform(base64ImageString) {
    this.sanitizer.bypassSecurityTrustResourceUrl(base64ImageString);
  }
  public logout() {
    this.localStorageService.clearAll();
    this.router.navigate(['/login']);
  }

  public savePost() {
    let url = "http://localhost:8080/posts/create";
    this.postModel.imageString = this.base64textString.toString();
    this.http.post(url, this.postModel).subscribe(
      response => {
          this.posts = response;
      },
      error => {

      }
    )
  }
  public onFileChanged(event) {
    //let reader = new FileReader();
    //reader.readAsDataURL(event.target.files[0]);
    //reader.onload = (event2) => {
    //  this.imgUrl = reader.result;
    //}
    //alert(this.imgUrl);
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
  }

  ngOnInit(): void {
    let url = "http://localhost:8080/posts/my?userId=" + this.localStorageService.get("userId");
    let result = this.http.get(url);
    result.subscribe((data)=> this.posts = data);
  }

}
export interface UserPostViewModel {
  id: number,
  imageString: string,
  title: string,
  explanation: string,
  userId: number
}
