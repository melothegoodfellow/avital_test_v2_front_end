import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListComponent } from './post/list/list.component';

const routes: Routes = [
  {
    path: "login", component: LoginComponent,
  },{
    path: "post", component: ListComponent
  },{
    //change to post list
    path: "", redirectTo: "/login", pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
