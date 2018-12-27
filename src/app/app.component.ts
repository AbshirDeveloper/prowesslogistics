import { Component, OnInit } from '@angular/core';
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

  loadToBeBilled = [];

  today = Date.now();

  getData(){
    this.service.get().subscribe(
      data => {
        this.loadToBeBilled = data[2].filter(el => new Date(el.delivery_time).getTime() < this.today && el.billed === 'Nope, Bill it now')
        .map(element => {
          element.late = (+(this.today) - +(new Date(element.delivery_time).getTime())) / 86400;
          return element;
        });
      })
  }

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

  ngOnInit(){
    this.getData();
  }
}
