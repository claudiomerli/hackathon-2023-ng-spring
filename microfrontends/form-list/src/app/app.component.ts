import { Component } from '@angular/core';
import { Form } from './model/form';
import { FormService } from './services/form-service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    page = 1;
    pageSize = 1;
    collectionSize = 0;

  constructor(
    private formService: FormService,
    private httpClient: HttpClient
  ) { }

  getURL = 'https://entando.eng-entando.com/hackathon-2023-ng-spring-213f4f96/spring-ms/api/forms-structure';
  list : Form[] = [];
  error = false;

  ngOnInit() {

    this.httpClient.get(this.getURL).subscribe((res:any)=>{
      this.list = res;
      this.list.push({id:1, name:'form-1',  answerCount: 100, structure: ''});
      this.list.push({id:2, name:'form-2', answerCount: 40, structure: ''});
      this.collectionSize = this.list.length;
      console.log('RES:'+this.list);
    });

  }

}
