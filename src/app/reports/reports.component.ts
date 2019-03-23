import { Component, OnInit } from "@angular/core";
import { ServiceService } from "../utils/service.service";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"]
})
export class ReportsComponent implements OnInit {
  constructor(private service: ServiceService) {}
  driver = false;
  overall = true;
  overall_class = "active";
  driver_class = "";
  switch() {
    this.driver = !this.driver;
    this.overall = !this.overall;
    if (this.overall_class === "active") {
      this.overall_class = "";
      this.driver_class = "active";
    } else {
      this.overall_class = "active";
      this.driver_class = "";
    }
  }

  selectedDriverTransactions = [];
  selectedDriver = {};
  getSum(a, b) {
    return a + b;
  }
  pops(id) {
    window.localStorage.setItem("edit", id);
    document.getElementById("myEdit2").style.display = "block";

    this.selectedDriver["name"] = this.drivers
      .filter(el => el.id == id)
      .map(elemenet => {
        return elemenet.name;
      });
    this.selectedDriver["phone"] = this.drivers
      .filter(el => el.id == id)
      .map(elemenet => {
        return elemenet.phone;
      });
    this.selectedDriverTransactions = this.transaction
      .filter(el => el.owner_id === id && el.type === "driver settlement")
      .map(element => {
        var totalBroker = [0];
        this.loads
          .filter(el => el.transaction_number === element.id)
          .map(el => {
            totalBroker.push(+el.charge);
          });
        element.numberOfLoads = this.loads.filter(
          el => el.transaction_number === element.id
        ).length;
        element.total = totalBroker.reduce(this.getSum);
        return element;
      });
    // if(!this.selectedDriverTransactions['numberOfLoads']){
    // this.transaction.filter(el => el.owner_id === id && el.type === 'Billed').map(element => {
    //   this.selectedDriverTransactions['numberOfLoads'] = this.loads.filter(el => el.transaction_number === element.id).length;
    //   }
    //   );
    // }
  }

  pop_close() {
    document.getElementById("myEdit2").style.display = "none";
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012"
  ];
  public barChartType: string = "bar";
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Loss" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Profit" }
  ];

  public barChartDataDriver: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Advance" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Profit" }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  picker;
  pickers;

  drivers;
  loads;
  deduction;
  transaction;
  allDriversSummary = [];
  getData() {
    this.service.get().subscribe(data => {
      this.drivers = data[0];
      this.loads = data[2];
      this.deduction = data[4];
      this.transaction = data[5];

      this.allDriversSummary = this.drivers.map(driver => {
        driver.driverName = driver.name;
        driver.totaLoads = this.loads.filter(
          load =>
            load.driver_id == driver.id &&
            load.settled === "yes" &&
            new Date(load.date_settled).getTime() >
              new Date(this.start).getTime() &&
            new Date(load.date_settled).getTime() < new Date(this.end).getTime()
        ).length;

        var charge = [0];
        this.loads
          .filter(
            load =>
              load.driver_id == driver.id &&
              load.settled === "yes" &&
              new Date(load.date_settled).getTime() >
                new Date(this.start).getTime() &&
              new Date(load.date_settled).getTime() <
                new Date(this.end).getTime()
          )
          .map(el => {
            charge.push(+el.charge);
          });
        var exp = [0];
        this.deduction
          .filter(
            deduction =>
              deduction.driver_id == driver.id &&
              deduction.type === "driver settlement" &&
              new Date(deduction.date).getTime() >
                new Date(this.start).getTime() &&
              new Date(deduction.date).getTime() < new Date(this.end).getTime()
          )
          .forEach(el => {
            exp.push(+el.amount);
          });

        // var net = [0];
        // this.transaction.filter(transaction => transaction.owner_id == driver.id).map(el => {
        //   net.push(+el.amount);
        // })

        var netC = [0];

        this.transaction
          .filter(
            transaction =>
              transaction.owner_id == driver.id &&
              new Date(transaction.date).getTime() >
                new Date(this.start).getTime() &&
              new Date(transaction.date).getTime() <
                new Date(this.end).getTime()
          )
          .forEach(el => {
            this.loads
              .filter(element => element.transaction_number === el.id)
              .map(el => {
                netC.push(+el.net_profit);
              });
          });

        var generalDeduction = [0];
        this.deduction
          .filter(
            deduction =>
              deduction.driver_id === driver.id &&
              deduction.type === "Billed" &&
              new Date(deduction.date).getTime() >
                new Date(this.start).getTime() &&
              new Date(deduction.date).getTime() < new Date(this.end).getTime()
          )
          .map(el => {
            generalDeduction.push(+el.amount);
          });

        function getSum(total, num) {
          return total + num;
        }
        driver.totalCharge = charge.reduce(getSum);
        driver.expenses = exp.reduce(getSum);
        // driver.netPay = net.reduce(getSum);
        driver.deductions = generalDeduction.reduce(getSum);
        driver.final = netC.reduce(getSum);
        driver.finals =
          driver.totalCharge * 0.12 -
          (driver.deductions + driver.totalCharge * 0.0295);

        return driver;
      });

      var totale = [0];
      this.allDriversSummary.map(el => {
        totale.push(+el.finals);
      });

      function getSum(total, num) {
        return total + num;
      }

      this.total = totale.reduce(getSum);
    });
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40
    ];
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
  public pieChartLabels: string[] = ["Jamac", "Sigad", "Omar"];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: string = "pie";
  coll = document.getElementsByClassName("collapsible");
  i;

  total;
  loggedInStaff;
  start = 0;
  end = "1 March, 2050";
  changeStart() {
    this.getData();
  }

  changeEnd() {
    this.getData();
  }
  ngOnInit() {
    this.loggedInStaff = JSON.parse(window.localStorage.getItem("loggedStaff"));
    this.getData();

    for (this.i = 0; this.i < this.coll.length; this.i++) {
      this.coll[this.i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
  }
}
