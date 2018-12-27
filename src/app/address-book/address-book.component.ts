import { Component, OnInit, OnChanges } from '@angular/core';
import { driver, broker } from '../utils/interface';
import { Driver } from 'selenium-webdriver/opera';
import { ServiceService } from '../utils/service.service'
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormControl, FormControlName, FormArray, FormArrayName, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit {

  userForm: FormGroup;

  constructor(private service: ServiceService, private router: Router, private fb: FormBuilder) { }

  driver = true;

  message;

  
  drivers:any;
  driverList: driver[];
  brokerList: broker[];

  driver_info = {
  };

  checked;

  familyName;

  changeStatus;
  numberOfFields
  amount0;
  amount1;
  amount2;
  amount3;
  driverPayableLoad = [];
  activate(id){
    this.changeStatus = {
      id: id,
      always : true,
      checked: this.checked
    }
    this.service.post(this.changeStatus).subscribe(
    data => {},()=> this.getData())
  }

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

  transactionRegisteration = {};
  registerTransaction(){
    this.transactionRegisteration = {
      owner_id: this.selected_driver['id'],
      type: 'driver settlement',
      amount: this.total,
      total_deductions: this.totalDeductions,
      number_of_loads: this.selectedLoadsLength.length,
      selectedLoads: this.selectedLoadsLength,
      deductions: this.content.filter(el => el.description !== null)
    }

    this.service.post(this.transactionRegisteration).subscribe(
      data => {},()=> this.getData())
      this.transactionRegisteration = {};
      this.pop_close();
        for(var i = 0; i < 9 ; i ++){
        (<FormArray>this.userForm.get('deductions')).removeAt(i)
        }
      this.summaryArray = [];
      this.total = 0;
  }

  getData(){
    this.service.get().subscribe(
      data => {
        this.driverList = data[0].map(el => {
          el.ubilled = [];
          data[2].forEach(element => {
            if(element.driver_id === el.id && new Date(element.delivery_time).getTime() < this.today && element.settled !== 'yes'){
              el.ubilled.push(element);
            }
          })
          return el;
        });
        this.brokerList = data[1];
    }
    );
    this.service.get().subscribe(
      data => {
        data[0].forEach(element => {
          if(element.id === this.selected_driver['id']){
            this.selected_driver = element;
          }
        });
    }
    )
  }

  selected_driver = [];
  pops(id){
    this.service.get().subscribe(
      data => {
        data[0].forEach(element => {
          if(element.id === id){
            this.selected_driver = element;
            this.checked = element.status === 'Active' ? true : false;
          }
        });
        this.driverPayableLoad = data[2].filter(element => element.driver_id === id).map(el => {
          el.pick = new Date(el.pick_up_date).getTime();
          el.drop = new Date(el.delivery_time).getTime();
          return el;
        });
    }
    )
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

  total = 0;



  content = [
    {
      description: null,
      deduction: null
    },
    {
      description: null,
      deduction: null
    },
    {
      description: null,
      deduction: null
    },
    {
      description: null,
      deduction: null
    },
    {
      description: null,
      deduction: null
    },
    {
      description: null,
      deduction: null
    },
    {
      description: null,
      deduction: null
    },
    {
      description: null,
      deduction: null
    }
  ];

  summaryArray = [];
  totalDeductions;
  totalCalculate(){

    var newArray = this.content.map(el => {
        return +el.deduction;
    })
    function getSum(total, num) {
    return total + num;
    }
    this.total = this.SelectedTotal - newArray.reduce(getSum)
    this.totalDeductions = newArray.reduce(getSum);
    this.summaryArray = this.content.filter(el => el.deduction != null);
  }
  ngOnInit() {
    this.dispatcher_info['broker_type'] = 'Dispatcher';
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
    };
    this.userForm = new FormGroup({
      i: new FormControl(),
      description: new FormControl(''),
      deduction: new FormControl(''),
      // deductions: new FormArray([])
      deductions: this.fb.array([
        this.addInputs()
      ])
    })

  };

  addInputs(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      deduction: ['', Validators.required]
    })
  }

  disabled = true;

  items;

  addDeduction(): void {
    (<FormArray>this.userForm.get('deductions')).push(this.addInputs());
    document.getElementsByClassName('input-group').length > 6 ? this.disabled = false : this.disabled = true;
    this.totalCalculate();
  };

  SelectedTotal = 0;
  selectedLoadsLength = [];
  calculateSelected(){
    var newArray = []
    this.driverPayableLoad.forEach(el => {
      if(el.select){
      newArray.push(+el.charge * .88);
      this.selectedLoadsLength.push(el.id);
      }
  });
  function getSum(total, num) {
  return total + num;
  }
  if(newArray.length > 0){
  this.SelectedTotal = newArray.reduce(getSum)
  } else {
  this.SelectedTotal = 0;
  }

  this.totalCalculate();
  }

  today = Date.now();

  deleteDeduction(index){
    (<FormArray>this.userForm.get('deductions')).removeAt(index)
    index > 6 ? this.disabled = false : this.disabled = true;
    this.content[index].deduction = null
    this.content[index].description = null;
    this.totalCalculate();
  };
}
