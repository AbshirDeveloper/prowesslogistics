import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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

  _login(){
    this.pages = true;
    this.login = false;
  }
}
