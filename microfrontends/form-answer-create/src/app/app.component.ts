import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'form-answer-create';
  constructor(private location: Location) {}
  ngOnInit() {

    // const url = this.location.path();
    // const urlParams = new URLSearchParams(url.split('?')[1]);
    // const paramName = urlParams.get('name');
    // const paramValue = urlParams.get('value');
    // console.log('Name:', paramName);
    // console.log('Value:', paramValue);

  }

}
