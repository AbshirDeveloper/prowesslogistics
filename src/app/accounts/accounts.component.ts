import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../utils/service.service'

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(private service: ServiceService) { }

  pops(id){
    window.localStorage.setItem('edit', id);
    document.getElementById('myEdit2').style.display = "block"; 
  }

  pop_close(){
    document.getElementById('myEdit2').style.display = "none"; 
  }

  loads = [];
  getData(){
    this.service.get().subscribe(
      data => {
        this.loads = data[2];
        // this.drivers = data[0];
    }
    )
  }

  ngOnInit() {
    this.getData();
  }

}
