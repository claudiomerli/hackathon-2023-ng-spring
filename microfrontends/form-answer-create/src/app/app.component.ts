import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'form-answer-create';
  idForm: string | undefined
  idAnswer: string | undefined
  constructor(private location: Location) {}
  ngOnInit() {

    this.getParams()

  }

  getParams(){
    const url = this.location.path();
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const paramIdForm = urlParams.get('idForm');
    const paramIdAnswer = urlParams.get('idAnswer');
    console.log('idForm:', paramIdForm);
    console.log('idAnswer:', paramIdAnswer);
    paramIdForm? this.idForm = paramIdForm: undefined;
    paramIdAnswer? this.idAnswer = paramIdAnswer: undefined;
  }

}
