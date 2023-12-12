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
    pageSize = 5;
    collectionSize = 0;

  constructor(
    private formService: FormService,
    private httpClient: HttpClient
  ) { }

  getURL = 'https://entando.eng-entando.com/hackathon-2023-ng-spring-213f4f96/spring-ms/api/forms-structure';
  detailURL = 'https://entando.eng-entando.com/entando-de-app/en/dettaglio_form.page?idForm='
  editURL = 'https://entando.eng-entando.com/entando-de-app/en/dettaglio_risposta.page?idForm='
  newURL = 'https://entando.eng-entando.com/entando-de-app/en/crea_nuovo_form.page'

  list : Form[] = [];
  error = false;

  ngOnInit() {
    this.getList();
  }
 
  getList(){
      this.httpClient.get(this.getURL).subscribe((res : any)=>{
        this.list = res;
        this.collectionSize = this.list.length;
        this.list = this.list.map((country, i) => ({ id: i + 1, ...country })).slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize,
        );
      });
  }

}
