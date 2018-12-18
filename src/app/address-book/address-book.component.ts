import { Component, OnInit, OnChanges } from '@angular/core';
import { driver, broker } from '../utils/interface';
import { Driver } from 'selenium-webdriver/opera';
import { ServiceService } from '../utils/service.service'
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  driver = true;

  message;

  drivers:any;
  driverList: driver[];
  brokerList: broker[];

  driver_info = {
  };

  dispatcher_info = {}

  register_driver(){
    this.service.post(this.driver_info).subscribe(
      data => {},()=> this.getData())
      this.driver_info = {};
  }

  register_broker(){
    this.service.post(this.dispatcher_info).subscribe(
      data => {},()=> this.getData())
      this.dispatcher_info = {}

  }
  
  onBlurMethod(){
      // check if property exists already
  }

  getData(){
    this.service.get().subscribe(
      data => {
        this.driverList = data[0];
        this.brokerList = data[1];
    }
    )
  }
  pops(id){
    window.localStorage.setItem('edit', id);
    document.getElementById('myEdit2').style.display = "block"; 
  }

  pop_close(){
    document.getElementById('myEdit2').style.display = "none"; 
  }
  delete_object = {
    table: '',
    id: ''
  }
  confirmation
  setForDelet(id, table){
    this.confirmation = prompt("please enter you password to delete this "+table);
      if(this.confirmation === '773'){
        this.delete_object.table = table;
        this.delete_object.id = id;
        this.delete();
      }
  }
  delete(){
    this.service.delete(this.delete_object).subscribe(
      data => {},()=> this.getData())
  }

  coll = document.getElementsByClassName("collapsible");
  collTwo = document.getElementsByClassName("collapsibleTwo");
  i;

  ngOnChanges(){
    this.message = window.localStorage.getItem('message');
  }
  ngOnInit() {
    this.getData();
    for (this.i = 0; this.i < this.coll.length; this.i++) {
      this.coll[this.i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
      });
    }

    for (this.i = 0; this.i < this.collTwo.length; this.i++) {
      this.collTwo[this.i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
      });
    }
  }

}
