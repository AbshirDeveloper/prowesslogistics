import { Component } from '@angular/core';
import { ServiceService } from './utils/service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (private service: ServiceService) {}
  title = 'prowess';

// looged in?
  pages = true;
  login = false;
  
// admin?
  em = true;
  ad = false;

  logout(){
    this.login = true;
    this.pages = false;
  }

  info = {
    username: null,
    password: null,
    table: 'login', 
  }

  returned_response = null;

  _login(){
    this.service.post(this.info).subscribe(
      log => {
        this.returned_response = log;
        debugger;
        if(log === 'thisName'){
          this.pages = true;
          this.login = false;
        }
    }
    )
  }
}
