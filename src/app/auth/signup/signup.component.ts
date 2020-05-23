import { UsersService } from "./../users.service";
import { OnInit, OnDestroy, Component } from "@angular/core";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";

@Component({
  selector: "signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  private imagePath: string;
  private dateRegistered: Date;
  hide = false;

  constructor(public userService: UsersService) {}

  ngOnInit() {}

  ngOnDestroy() {}

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.isLoading = true;
    this.imagePath = null;
    this.dateRegistered = new Date();
    //call RESTful api method to signup
    this.userService.addUser(
      form.value.firstname,
      form.value.lastname,
      form.value.address,
      form.value.location,
      form.value.email,
      form.value.password,
      form.value.gender,
      form.value.mobile,
      form.value.dateOfBirth,
      this.imagePath,
      this.dateRegistered
    );
    form.resetForm();
  }
}
