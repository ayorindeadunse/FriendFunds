import { Subscription } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UsersService } from "./../users.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public userService: UsersService) {}

  ngOnInit() {
    //get authstatus listener
    this.authStatusSub = this.userService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onLogin(form: NgForm) {
    // this.isLoading = true;
    this.userService.login(form.value.email, form.value.password);
  }
}
