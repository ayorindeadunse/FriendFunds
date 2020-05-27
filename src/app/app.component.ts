import { UsersService } from "./auth/users.service";
import { Component, OnInit } from "@angular/core";
//import {Subscription} from 'rxjs';
//import {ErrorService} from "./error/error.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "friendfunds";
  //hasError = false;
  //private errorSub: Subscription

  constructor(
    private usersService: UsersService //private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.usersService.autoAuthUser();
    //this.errorSub = this.errorService.getErrorListener().
    //subscribe(message => this.hasError = message !== null);
  }

  //ngOnDestroy()
  // {
  //this.errorSub.unsubscribe();
  //}
}
