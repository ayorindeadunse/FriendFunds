import { FriendsComponent } from "./friends/friends.component";
import { AuthGuard } from "./auth/auth.guard";
import { AboutComponent } from "./about/about.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
//import authguard

const routes: Routes = [
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "about", component: AboutComponent },
  { path: "friends", component: FriendsComponent },
  { path: "auth", loadChildren: "./auth/auth.module#AuthModule" },
];

@NgModule({
  //takes the root/route config so the routes can be defined here
  //and make angular aware of the routes
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  //include
  providers: [AuthGuard],
})
export class AppRoutingModule {}
