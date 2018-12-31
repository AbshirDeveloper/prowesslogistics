import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../utils/service.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private service:ServiceService) { }

  drivers;
  loads;
  deduction;
  transaction;
  summary = {}

  today = Date.now();
  getData(){
    this.service.get().subscribe(
      data => {
        this.drivers = data[0]
        this.loads = data[2]
        this.deduction = data[4]
        this.transaction = data[5];

        this.summary['activeLoad'] = this.loads.filter(load =>  new Date(load.delivery_time).getTime() > this.today).length;
        this.summary['dueForBilling'] = this.loads.filter(load =>  new Date(load.delivery_time).getTime() < this.today && load.billed === 'Nope, Bill it now').length;
        this.summary['delinquent'] = 4;
        this.summary['dueForSettlement'] = this.loads.filter(load =>  new Date(load.delivery_time).getTime() < this.today && load.settled !== 'yes').length;
      })
  }

  ngOnInit() {
    this.getData();
  }

}
