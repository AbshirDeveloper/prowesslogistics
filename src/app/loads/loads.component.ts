import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../utils/service.service'

@Component({
  selector: 'app-loads',
  templateUrl: './loads.component.html',
  styleUrls: ['./loads.component.css']
})
export class LoadsComponent implements OnInit {

  constructor(private service: ServiceService) { }

  load = {};
  loads = [];
  drivers = [];
  selected_driver = {};
  search;
  error;
  search_drop;
  selected_load = {};
  assignment = {};
  find_drop(){
    this.error = null;
    this.search = null
    this.selected_driver = {};
    this.service.get().subscribe(
      data => {
        data[0].forEach(element => {
          if(element.name === this.search_drop){
            this.selected_driver = element;
          }
        });
    }
    )
  }
  assign(){
    this.assignment = {
      driver: this.selected_driver,
      load: this.selected_load
    }
    this.service.post(this.assignment).subscribe(
      data => {},()=> this.ngOnInit())
  }
  find(){
    this.error = null;
    this.search_drop = null
    this.selected_driver = {};
    if(this.search.length > 0){
    this.service.get().subscribe(
      data => {
        data[0].forEach(element => {
          if(element.phone === this.search){
            this.selected_driver = element;
          } else {
            this.error = 'Driver not found, try again';
          }
        });
    }
    )
  }
  }
  getData(){
    this.service.get().subscribe(
      data => {
        this.loads = data[2];
        this.drivers = data[0];
    }
    )
  }
  delete_object = {
    table: '',
    id: ''
  }
  confirmation
  setForDelete(id, table){
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

  register_load(){
    this.service.post(this.load).subscribe(
      data => {},()=> this.ngOnInit())
      // this.load = {};
  }

  pops(id){
      this.service.get().subscribe(
        data => {
          data[2].forEach(element => {
            if(element.id === id){
              this.selected_load = element;
            }
          });
      }
      )
    window.localStorage.setItem('edit', id);
    document.getElementById('myEdit2').style.display = "block"; 
  }

  pop_close(){
    document.getElementById('myEdit2').style.display = "none"; 
  }
  coll = document.getElementsByClassName("collapsible");
  i;
  total;
  calculate(){
      this.total = (this.perMile ? +this.load['charge'] * +this.load['miles'] : +this.load['charge']);
  }

  perMile = false;

  miles(a){
    this.perMile = (a === 'Mile' ? true : false);
    this.total = (a === 'Mile' ? +this.load['charge'] * +this.load['miles'] : +this.load['charge']);
  }
  comments;
  unassign_info = {};
  unassign(id, comments){
    this.unassign_info = {
      id: id,
      comments: comments
    }
    this.service.post(this.unassign_info).subscribe(
      data => {},()=> this.ngOnInit())
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
  }

}
