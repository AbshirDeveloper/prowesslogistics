import { Component, OnInit, enableProdMode } from '@angular/core';
import { ServiceService } from './utils/service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private service: ServiceService, private router: Router) {}
  title = 'prowess';

// looged in?
  pages = true;
  login = false;
  reset = false;
// admin?
  em = true;
  ad = false;

  logout(){
    this.login = true;
    this.pages = false;
    this.router.navigate([''])
    window.localStorage.setItem('logged', 'false');
    this.error = null
    this.inactiveError = null;
    this.resetSuccess = null;
  }

  info = {};

  returned_response = null;

  onActivate(a){
    if(window.localStorage.getItem('logged') !== 'true'){
      this.pages = false;
      this.login = true;
    }
    this.getData();
  }

  onDeactivate(a){
    if(window.localStorage.getItem('logged') !== 'true'){
      this.pages = false;
      this.login = true;
    }
    this.getData();
  }

  loadToBeBilled = [];

  today = Date.now();

  resetPass = {
    id: ''
  };

  checkEquality(){
    if(this.resetPass['newPasswordOne'] !== this.resetPass['newPasswordTwo']){
      this.errorUnequalPassword = 'Please make sure that your new password and confirm-password match';
    } else {
      this.errorUnequalPassword = null;
    }
  }

  resetPassword() {
    debugger;
    if(this.resetPass['newPasswordOne'] === this.resetPass['newPasswordTwo']){
    this.service.post(this.resetPass).subscribe(
      log => {
        if(log == 'success'){
          this.resetSuccess = 'Successfully reset your password, please login with your new password';
            this.pages = false;
            this.login = true;
            this.reset = false;
            this.error = null;
            this.inactiveError = null;
        }
      }
    )
    } else {
      this.errorUnequalPassword = 'Please make sure that your new password and confirm-password match';
      return false;
    }
  }

  getData(){
    this.service.get().subscribe(
      data => {
        this.loadToBeBilled = data[2].filter(el => new Date(el.delivery_time).getTime() < this.today && el.billed === 'Nope, Bill it now')
        .map(element => {
          element.late = (this.today / (86400 * 1000)) - ((new Date(element.delivery_time).getTime()) / (86400 * 1000));
          return element;
        });
      })
  }
error;
inactiveError;
resetSuccess;
errorUnequalPassword;
loggedStaff = {};
  _login(){
    this.service.post(this.info).subscribe(
      log => {
        if(log){
          if(log[0].status === '1'){
          window.localStorage.setItem('loggedStaff', JSON.stringify(log[0]));
          this.loggedStaff = JSON.parse(window.localStorage.getItem('loggedStaff'));
          if(log[0].reset === 'yes'){
            this.resetPass.id = log[0].id;
            this.pages = false;
            this.login = false;
            this.reset = true;
            this.error = null;
            this.inactiveError = null;
          } else {
            this.pages = true;
            this.login = false;
            this.reset = false;
            this.resetSuccess = null;
          this.router.navigate(['/dashboard'])
          window.localStorage.setItem('logged', 'true');
          }
          } else {
            this.inactiveError = 'Your account is deactivated by the ADMIN';
            this.error = null;
          }
        } else {
          this.error = 'Wrong password and username';
          this.inactiveError = null;
        }
    }
    )
  }
  ngOnInit(){
  this.loggedStaff = JSON.parse(window.localStorage.getItem('loggedStaff'));
    this.getData();
  }
}
