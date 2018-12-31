import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../utils/service.service'
import { SharedServiceService } from '../shared-service.service'
import { FormGroup, FormControl, FormControlName, FormArray, FormArrayName, Validators} from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(private service: ServiceService, private fb: FormBuilder, private shared: SharedServiceService) { }

  popped = false;
  totalForLoads = 0;
  pops(id){
    window.localStorage.setItem('edit', id);
    document.getElementById('myEdit2').style.display = "block"; 
    this.selected_loads = this.loads.filter(el => el.id === id )
    this.popped = true;

    var newArray = this.selected_loads.map(el => {
      return +el.charge;
    })
    function getSum(total, num) {
    return total + num;
    }
    this.totalForLoads = newArray.reduce(getSum)
    this.factoring = this.totalForLoads * .0295;
  }

  pop_group(){
    document.getElementById('myEdit2').style.display = "block"; 
    this.selected();
    this.popped = true;
    var newArray = this.selected_loads.map(el => {
      return +el.charge;
    })
    function getSum(total, num) {
    return total + num;
    }
    this.totalForLoads = newArray.reduce(getSum)
    this.factoring = this.totalForLoads * .0295;
  }

  pop_close(){
    document.getElementById('myEdit2').style.display = "none"; 
    for(var i = 0; i < 8 ; i ++){
      (<FormArray>this.userForm.get('deductions')).removeAt(i)
      this.content[i].description = null;
      this.content[i].deduction = null;
      }
    this.popped = false;
  }

  loads = [];
  pickup;
  dropp;
  loadToBeBilled = [];
  getData(){
    this.service.get().subscribe(
      data => {
        this.loadToBeBilled = data[2].filter(el => new Date(el.delivery_time).getTime() < this.today && el.billed === 'Nope, Bill it now')
          .map(element => {
            element.late = (this.today / (86400 * 1000)) - ((new Date(element.delivery_time).getTime()) / (86400 * 1000));
            return element;
          });
        this.loads = data[2].map(el => {
          el.epoch = new Date(el.delivery_time).getTime();
          return el;
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


  userForm: FormGroup;
  disabled = true;

  summaryArray = [];
  totalDeductions;
  SelectedTotal;
  total;
  factoring = 0;

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

  getSum(total, num){
    return total + num;
  }

  totalCalculate(){
    var newArray = this.content.map(el => {
        return +el.deduction;
    })
    function getSum(total, num) {
    return total + num;
    }
    this.total = this.totalForLoads - newArray.reduce(getSum)
    this.totalDeductions = newArray.reduce(getSum);
    this.summaryArray = this.content.filter(el => el.deduction != null);
  }

  addInputs(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      deduction: ['', Validators.required]
    })
  }

  addDeduction(): void {
    (<FormArray>this.userForm.get('deductions')).push(this.addInputs());
    document.getElementsByClassName('input-group').length > 6 ? this.disabled = false : this.disabled = true;
    this.totalCalculate();
  };

  transactionRegisteration = {};
  registerTransaction(){
    this.transactionRegisteration = {
      owner_id: this.selected_loads[0].driver_id,
      type: 'Billed',
      amount: this.total,
      total_deductions: this.totalDeductions,
      number_of_loads: this.selected_loads.length,
      selectedLoad: this.selected_loads.map(el => {
        var newArr = el;
        newArr.netProfit = (newArr.charge * .0905) - +(this.content.filter(el => el.description !== null).map(el => {
          return +el.deduction;
        }).reduce(this.getSum) / this.selected_loads.length);
        return newArr;
      }),
      deductions: this.content.filter(el => el.description !== null),
      afterFactoring: this.totalForLoads - this.factoring
    }

    debugger;

    this.service.post(this.transactionRegisteration).subscribe(
      data => {},()=> this.getData())
      this.transactionRegisteration = {};
      this.pop_close();
      this.summaryArray = [];
      this.total = 0;
      this.getData();
  }

  deleteDeduction(index){
    (<FormArray>this.userForm.get('deductions')).removeAt(index)
    index > 6 ? this.disabled = false : this.disabled = true;
    this.content[index].deduction = null
    this.content[index].description = null;
    this.totalCalculate();
  };
  loggedInStaff;
  ngOnInit() {
    this.loggedInStaff = JSON.parse(window.localStorage.getItem('loggedStaff'));
    // this.shared.updatedLoads = this.loadToBeBilled;
    this.shared.emitChange(this.loadToBeBilled);
    // this.pickup = new Date(element.pick_up_date).getTime();
    // this.dropp = new Date(element.delivery_time).getTime();
    this.getData();

    this.userForm = new FormGroup({
      i: new FormControl(),
      description: new FormControl(''),
      deduction: new FormControl(''),
      // deductions: new FormArray([])
      deductions: this.fb.array([
        this.addInputs()
      ])
    })
  }

}
