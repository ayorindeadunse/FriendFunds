import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UsersService } from "./../users.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  isLoading = false;
  //private authStatusSub: Subscription;

  constructor(public userService: UsersService) {}

  ngOnInit() {}
  ngOnDestroy() {}

  onLogin(form: NgForm) {
    this.isLoading = true;
    this.userService.login(form.value.email, form.value.password);
  }
}
