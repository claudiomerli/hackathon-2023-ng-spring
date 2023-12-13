import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  idForm: string | undefined
  idAnswer: string | undefined
  constructor() {}
  ngOnInit() {

    this.getParams()

  }

  getParams(){
    const urlParams = new URLSearchParams(location.search);
    const paramIdForm = urlParams.get('idForm');
    const paramIdAnswer = urlParams.get('idAnswer');
    console.log('idForm:', paramIdForm);
    console.log('idAnswer:', paramIdAnswer);
    paramIdForm? this.idForm = paramIdForm: undefined;
    paramIdAnswer? this.idAnswer = paramIdAnswer: undefined;
  }

}
