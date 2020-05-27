import { AuthData } from "./auth-data.model";
import { UserData } from "./user.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class UsersService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  //userId variable
  private authStatusListener = new Subject<boolean>();
  //variable that keeps track of new users added to the platform
  //it's a subject of type User in the user model

  //inject http client to call the RESTful api by adding to constructor
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  //getUserId()
  //{
  // return this.userId;
  //}

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  //getUsers

  //getUsers closest to user (location)

  //getUsers (User's "friends")

  //userUpdateListener to listen for when new users have been added
  //to the platform

  //define addUser() function and pass parameters (remember null)
  //values for fields not required.

  //factor in the encrypted password to add
  addUser(
    firstname: string,
    lastname: string,
    address: string,
    location: string,
    email: string,
    password: string,
    gender: string,
    mobile: Number,
    dateOfBirth: Date,
    imagePath: string,
    dateRegistered: Date
  ) {
    const userData: UserData = {
      firstname: firstname,
      lastname: lastname,
      address: address,
      location: location,
      email: email,
      password: password,
      gender: gender,
      mobile: mobile,
      dateOfBirth: dateOfBirth,
      imagePath: null,
      dateRegistered: dateRegistered,
    };
    //remember to update the users.service.ts file to include the environment variable for the global url
    this.http
      .post<{ message: string; userID: string }>(
        "http://localhost:3002/api/user/signup",
        userData
      )
      .subscribe((responseData) => {
        //navigate to e-mail confirmation page.
      });
  }

  //login
  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    //call restful api with login route
    this.http
      .post<{ token: string; expiresIn: number }>(
        "http://localhost:3002/api/user/login",
        authData
      )
      .subscribe((response) => {
        const token = response.token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(["/"]);
        }
      });
  }

  //autoAuthUser

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
  //logout
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    //initialize userId to null
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/login"]);
  }
  //set Authentification timer
  private setAuthTimer(duration: number) {
    console.log("Setting Timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  //save authentication data
  saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    //include userId
  }
  //Clear authentification data
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    //remove userId as well
  }
  //Get authentification data
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      //include userId
    };
  }
}
