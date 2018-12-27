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
  pickup;
  dropp;
  getData(){
    this.service.get().subscribe(
      data => {
        data[2].map(el => {
          el.epoch = new Date(el.delivery_time).getTime();
          this.loads.push(el);
        })
        // this.drivers = data[0];
    }
    )
  }
  selected_loads = [];
  selected(){
    this.selected_loads = this.loads.filter(el => el.selected === true )
  }
  today = Date.now();
  ngOnInit() {

    // this.pickup = new Date(element.pick_up_date).getTime();
    // this.dropp = new Date(element.delivery_time).getTime();
    this.getData();
  }

}
