import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { ServiceService } from "../utils/service.service";

@Component({
  selector: "app-deductions",
  templateUrl: "./deductions.component.html",
  styleUrls: ["./deductions.component.css"]
})
export class DeductionsComponent implements OnInit {
  constructor(private service: ServiceService) {}
  coll = document.getElementsByClassName("collapsible");
  collTwo = document.getElementsByClassName("collapsibleTwo");
  collThree = document.getElementsByClassName("collapsibleThree");
  collFour = document.getElementsByClassName("collapsibleFour");
  collFive = document.getElementsByClassName("collapsibleFive");
  collSixth = document.getElementsByClassName("collapsibleSixth");
  collSeventh = document.getElementsByClassName("collapsibleSeventh");
  i;

  advance = {
    toA: "Driver"
  };
  addStaff = {
    staff: "Staff"
  };

  staff = [];

  registerStaff() {
    this.service
      .post(this.addStaff)
      .subscribe(data => {}, () => this.getData());
    this.addStaff = {
      staff: "Staff"
    };
  }

  deleteTransaction(id, type) {
    debugger;
    var prom = prompt("Please enter your delete code");
    if (prom === "1632") {
      var deleteTran = {
        forTranDelete: "yes",
        id: id,
        type: type
      };
      this.service.post(deleteTran).subscribe(data => {}, () => this.getData());
    } else {
      return false;
    }
  }

  addAdvance() {
    if (
      this.advance["loadNumber"] == null &&
      this.advance["loadNumber"] == undefined
    ) {
      this.advance["loadNumber"] = "N/A";
    }
    this.service.post(this.advance).subscribe(data => {}, () => this.getData());
    this.advance = {
      toA: "Driver"
    };
  }

  drivers = [];
  dispatchers = [];
  advancedLoads = [];
  transactions = [];
  today = Date.now();
  getData() {
    this.service.get().subscribe(data => {
      this.dispatchers = data[1];
      this.transactions = data[5];
      this.drivers = data[0].filter(
        el => el.advance_money_eligible === "eligible"
      );
      this.advancedLoads = data[6];
      this.staff = data[7];
    });
  }

  deleteAdvance(id) {
    var prom = prompt("Are you sur you wanto to delete this");
    if (prom === "1632") {
      var deleteAdvance = {
        delete: true,
        id: id
      };
      this.service
        .post(deleteAdvance)
        .subscribe(data => {}, () => this.getData());
    }
  }

  oneStaff = {};

  updateStaff() {
    this.oneStaff["updatingStaff"] = "staff";
    this.service
      .post(this.oneStaff)
      .subscribe(data => {}, () => this.getData());
    this.pop_close();
  }

  pops(id) {
    this.oneStaff = this.staff.filter(el => el.id === id)[0];
    document.getElementById("myEdit2").style.display = "block";
  }

  pop_close() {
    document.getElementById("myEdit2").style.display = "none";
  }
  loggedInStaff;

  deleteStaff(id) {
    var prom = prompt("Enter your password to delete this staff");
    if (prom === "1632") {
      const staffDelete = {
        staffDeleting: "yes",
        id: id
      };
      this.service
        .post(staffDelete)
        .subscribe(data => {}, () => this.getData());
    }
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

    for (this.i = 0; this.i < this.collTwo.length; this.i++) {
      this.collTwo[this.i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }

    for (this.i = 0; this.i < this.collThree.length; this.i++) {
      this.collThree[this.i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }

    for (this.i = 0; this.i < this.collFour.length; this.i++) {
      this.collFour[this.i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
    for (this.i = 0; this.i < this.collFive.length; this.i++) {
      this.collFive[this.i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
    for (this.i = 0; this.i < this.collSixth.length; this.i++) {
      this.collSixth[this.i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
    for (this.i = 0; this.i < this.collSeventh.length; this.i++) {
      this.collSeventh[this.i].addEventListener("click", function() {
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
