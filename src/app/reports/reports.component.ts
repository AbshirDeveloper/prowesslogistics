import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../utils/service.service'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private service: ServiceService) { }
  driver = false;
  overall = true;
  overall_class = 'active';
  driver_class = '';
  switch(){
  this.driver = !this.driver;
  this.overall = !this.overall;
  if(this.overall_class === 'active'){
    this.overall_class = '';
    this.driver_class = 'active'; 
  } else {
    this.overall_class = 'active';
    this.driver_class = ''; 
  }
  }

  pops(id){
    window.localStorage.setItem('edit', id);
    document.getElementById('myEdit2').style.display = "block"; 
  }

  pop_close(){
    document.getElementById('myEdit2').style.display = "none"; 
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Loss'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Profit'}
  ];

  public barChartDataDriver:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Advance'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Profit'}
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  drivers;
  loads;
  deduction;
  transaction;
  allDriversSummary = [];
  getData(){
    this.service.get().subscribe(
      data => {
        this.drivers = data[0]
        this.loads = data[2]
        this.deduction = data[4]
        this.transaction = data[5];

        this.allDriversSummary = this.drivers.map(driver => {
            driver.driverName = driver.name;
            driver.totaLoads = this.loads.filter(load => load.driver_id == driver.id).length;
            var charge = this.loads.filter(load => load.driver_id == driver.id).map(el => {
              return +el.charge;
            })
            var exp = this.deduction.filter(deduction => deduction.driver_id == driver.id && deduction.type === 'driver deductions').map(el => {
              return +el.amount;
            })

            var net = this.transaction.filter(transaction => transaction.owner_id == driver.id).map(el => {
              return +el.amount;
            })

            var generalDeduction = this.deduction.filter(deduction => deduction.driver_id == driver.id && deduction.type !== 'driver deductions').map(el => {
              return +el.amount;
            })

            function getSum(total, num) {
            return total + num;
            }
            driver.totalCharge = charge.reduce(getSum);
            driver.expenses = exp.reduce(getSum);
            driver.netPay = net.reduce(getSum);
            driver.deductions = generalDeduction.length ? generalDeduction.reduce(getSum) : 0;
            driver.final = (charge.reduce(getSum) * 0.12) - driver.deductions;

            return driver;
        });

        var totale = this.allDriversSummary.map(el => {
          return +el.final;
        })
    
        function getSum(total, num) {
        return total + num;
        }
    
        this.total = totale.reduce(getSum);
    }
    );
  }

  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
    // Pie
    public pieChartLabels:string[] = ['Jamac', 'Sigad', 'Omar'];
    public pieChartData:number[] = [300, 500, 100];
    public pieChartType:string = 'pie';
    coll = document.getElementsByClassName("collapsible");
    i;

    total;
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
