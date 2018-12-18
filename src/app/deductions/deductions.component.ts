import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-deductions',
  templateUrl: './deductions.component.html',
  styleUrls: ['./deductions.component.css']
})
export class DeductionsComponent implements OnInit {

  constructor() { }
  coll = document.getElementsByClassName("collapsible");
  collTwo = document.getElementsByClassName("collapsibleTwo");
  collThree = document.getElementsByClassName("collapsibleThree");
  collFour = document.getElementsByClassName("collapsibleFour");
  collFive = document.getElementsByClassName("collapsibleFive");
  collSixth = document.getElementsByClassName("collapsibleSixth");
  collSeventh = document.getElementsByClassName("collapsibleSeventh");
  i;
  ngOnInit() {
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

      for (this.i = 0; this.i < this.collThree.length; this.i++) {
        this.collThree[this.i].addEventListener("click", function() {
          this.classList.toggle("active");
          var content = this.nextElementSibling;
          if (content.style.maxHeight){
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
          if (content.style.maxHeight){
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
          if (content.style.maxHeight){
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
          if (content.style.maxHeight){
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
          if (content.style.maxHeight){
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          } 
        });
      }
  }

}
