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
  selected_driver = [];
  selected_carrier = [];
  carriers = [];
  search;
  error;
  search_drop;
  selected_load = {};
  assignment = {};
  today = Date.now();
  find_drop(){
    this.error = null;
    this.search = null
    this.selected_driver = [];
    this.service.get().subscribe(
      data => {
        data[0].filter(el => el.status === 'Active').forEach(element => {
          if(element.name === this.search_drop){
            this.selected_driver = element;
          }
        });
    }
    )
  }
  assign(){
    if(this.driver === 'active'){
    this.assignment = {
      driver: this.selected_driver,
      load: this.selected_load
    }
  } else {
    this.assignment = {
      carrier: this.selected_carrier,
      load: this.selected_load
    }
  }
  this.assignment['toAssign'] = 'yes';
    this.service.post(this.assignment).subscribe(
      data => {},()=> this.ngOnInit())
      this.pop_close();
  }
  find(){
    if(this.driver === 'active'){
    this.error = null;
    this.search_drop = null
    this.selected_driver = [];
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
  } else {
    this.service.get().subscribe(
      data => {
        data[3].forEach(element => {
          if(element.id === this.search_drop){
            this.selected_carrier = element;
          }
        });
    }
    )
  }
  }
  getData(){
    this.service.get().subscribe(
      data => {
        this.loads = data[2].map(el => {
          el.pick = new Date(el.pick_up_date).getTime()
          el.drop = new Date(el.delivery_time).getTime()
          return el;
        })
        this.drivers = data[0].filter(el => el.status === 'Active');
        this.carriers = data[3];
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

  loadNumberError
  itExists;
  checkLoadNumber(){
    const load_exist = this.loads.filter(el => el.ref_id === this.load['ref_id']);
    load_exist.length > 0 ? this.loadNumberError = 'This load exists' : this.loadNumberError = null;
    this.itExists = load_exist.length > 0 ? true : false;
  }

  loadTbeEdited = [];
  editLoad(id){
    this.loads.forEach(element => {
      if(element.id === id){
        this.selected_load = element;
        this.pickup = new Date(element.pick_up_date).getTime();
        this.dropp = new Date(element.delivery_time).getTime();
      }
    })
    window.localStorage.setItem('edit', id);
    document.getElementById('myEdit2').style.display = "block"; 
    document.getElementById('modalTwo').style.display = "none"; 
    document.getElementById('modalOne').style.display = "block"; 
  }

  register_load(){
    if(this.itExists){
    alert('this load exists');
    return false;
    } else {
    this.perMile || (this.load['miles'] = 'No Mile Given');
    this.load['total'] = this.total;
    if(this.load['delivery_time'] && new Date(this.load['delivery_time']).getTime() > new Date(this.load['pick_up_date']).getTime()){
      this.load['toRegister'] = 'yes';
      this.service.post(this.load).subscribe(
      data => {},()=> this.ngOnInit())
      this.load = {};
      this.selected_load = {};
      this.total = 0;
    } else {
      alert('please check the pick up and the drop dates');
      return false;
    }
  }
  }

  submitEditLoad(){
    this.perMile || (this.selected_load['miles'] = 'No Mile Given');
    this.selected_load['loadToEdit'] = 'yes';
    this.selected_load['total'] = this.total;
    this.service.post(this.selected_load).subscribe(
      data => {},()=> this.getData())
      this.selected_load = {};
      this.load = {};
      this.total = 0;
      this.pop_close();
  }
  pickup;
  dropp;
  pops(id){
    this.search_drop = null;
    this.selected_driver = [];
    this.selected_carrier = [];
      this.service.get().subscribe(
        data => {
          data[2].forEach(element => {
            if(element.id === id){
              this.selected_load = element;
              this.pickup = new Date(element.pick_up_date).getTime();
              this.dropp = new Date(element.delivery_time).getTime();
            }
          });
      }
      )
    window.localStorage.setItem('edit', id);
    document.getElementById('myEdit2').style.display = "block"; 
    document.getElementById('modalTwo').style.display = "block"; 
    document.getElementById('modalOne').style.display = "none"; 
  }

  pop_close(){
    document.getElementById('myEdit2').style.display = "none";
    this.ngOnInit(); 
  }
  coll = document.getElementsByClassName("collapsible");
  i;
  total;
  calculate(){
      this.total = (this.perMile ? +this.load['charge'] * +this.load['miles'] : +this.load['charge']);
  }

  calculateForEdit(){
    this.total = (this.perMile ? +this.selected_load['charge'] * +this.selected_load['miles'] : +this.selected_load['charge']);
}

  perMile = false;
  loadWithTotalCharge;

  milesForLoadEdit(a){
    this.perMile = (a === 'Mile' ? true : false);
    this.total = (a === 'Mile' ? +this.selected_load['charge'] * +this.selected_load['miles'] : +this.selected_load['charge']);
    this.load['total'] = this.total;
  }
  
  miles(a){
    this.perMile = (a === 'Mile' ? true : false);
    this.total = (a === 'Mile' ? +this.load['charge'] * +this.load['miles'] : +this.load['charge']);
    this.load['total'] = this.total;
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
      this.pop_close();
  }
  driver;
  carrier;
  switchToDriver(){
      this.carrier = '';
      this.driver = 'active'; 
      document.getElementById('driver').style.display = 'block';
      document.getElementById('carrier').style.display = 'none';
    }

    switchToCarrier(){
        this.carrier = 'active';
        this.driver = ''; 
        document.getElementById('driver').style.display = 'none';
        document.getElementById('carrier').style.display = 'block';
      }

  disabled;
  loadTime = 'current';
  loadTimeChanged(){
    this.check_pickup();
    this.check_delivery();
  }
   check_pickup(){
     if(this.loadTime === 'current'){
    new Date(this.load['pick_up_date']).getTime() <= this.today ? document.getElementById('pick_error').style.display = 'block' : document.getElementById('pick_error').style.display = 'none'
    new Date(this.load['pick_up_date']).getTime() > this.today ? this.disabled = false : this.disabled = true;
     } else {
      document.getElementById('pick_error').style.display = 'none';
      new Date(this.load['pick_up_date']).getTime() < this.today ? this.disabled = false : this.disabled = true;
     }
   }

   check_delivery(){
    if(this.loadTime === 'current'){
    (new Date(this.load['delivery_time']).getTime() < this.today || new Date(this.load['delivery_time']).getTime() < new Date(this.load['pick_up_date']).getTime()) ? document.getElementById('drop_error').style.display = 'block' : document.getElementById('drop_error').style.display = 'none'
    } else {
    new Date(this.load['delivery_time']).getTime() < new Date(this.load['pick_up_date']).getTime() ? document.getElementById('drop_error').style.display = 'block' : document.getElementById('drop_error').style.display = 'none'
    new Date(this.load['pick_up_date']).getTime() ? this.disabled = false : this.disabled = true;
    }
   }
  loggedInStaff;
  ngOnInit() {
    this.loggedInStaff = JSON.parse(window.localStorage.getItem('loggedStaff'));
    this.switchToDriver();
    this.load['status'] = 'Needs Driver';
    this.load['charge'] = 0;
    this.load['miles'] = 0;
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
