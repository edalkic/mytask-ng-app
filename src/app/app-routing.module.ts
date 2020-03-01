import {NgModule} from "@angular/core";
import { Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {UserPostComponent} from "./user-post/user-post.component";

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "posts", component: UserPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
