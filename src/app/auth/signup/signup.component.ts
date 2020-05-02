import { OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy
{
  isLoading = false;
  private authStatusSub: Subscription;

  constructor()
  {

  }

  ngOnInit()
  {

  }

  ngOnDestroy()
  {

  }

  onSignUp(form: NgForm)
  {
    if(form.invalid)
    {
      return;
    }
    this.isLoading = true;
    //call RESTful api method to signup
  }
}
