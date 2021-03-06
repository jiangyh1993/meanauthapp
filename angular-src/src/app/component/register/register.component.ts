import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService, 
              private authService: AuthService,
              private flashMessage: FlashMessagesService,
              private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill all fileds', {cssClass: 'alert-danger', timeout: 1000});
      return false;
    }

    // required email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please fill a validate email', {cssClass: 'alert-danger', timeout: 1000});
      return false;
    }

    //register user
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success ', timeout: 1000});
        this.router.navigate(['login']);
      } else {
        this.flashMessage.show('Some thing went wrong', {cssClass: 'alert-danger ', timeout: 1000});
        this.router.navigate(['register']);
      }
    });
  }
}
