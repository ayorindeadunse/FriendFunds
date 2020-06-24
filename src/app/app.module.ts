import { ErrorComponent } from "./error/error.component";
import { ErrorInterceptor } from "./error-interceptor";
import { AuthModule } from "./auth/auth.module";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { AngularMaterialModule } from "./angular-material.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./header/header.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AboutComponent } from "./about/about.component";
import { FooterComponent } from "./footer/footer.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FriendsComponent } from './friends/friends.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    FooterComponent,
    ErrorComponent,
    FriendsComponent,
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],

  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule {}
