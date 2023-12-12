import { Component } from '@angular/core';
import { Form } from './model/form';
import { FormService } from './services/form-service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import csvDownload from 'json-to-csv-export'
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';

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
    private httpClient: HttpClient,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  getURL = 'https://entando.eng-entando.com/hackathon-2023-ng-spring-213f4f96/spring-ms/api/forms-structure';
  detailURL = 'https://entando.eng-entando.com/entando-de-app/en/dettaglio_form.page?idForm='
  editURL = 'https://entando.eng-entando.com/entando-de-app/en/compila_risposta.page?idForm='
  newURL = 'https://entando.eng-entando.com/entando-de-app/en/crea_nuovo_form.page'

  list : Form[] = [];
  error = false;

  ngOnInit() {
    this.getList();
  }
 
  deleteForm(form: Form) {
    this.httpClient.delete(this.getURL+'/'+form.id).subscribe((res : any)=>{
      this.getList();
    });
  }

  getList(){
      this.httpClient.get(this.getURL).subscribe((res : any)=>{
        this.list = res;
        this.collectionSize = this.list.length;
        this.list = this.list.map((survey, i) => ({  ...survey })).slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize,
        );
      });
  }

  openConfirmationDialog(form : Form) {
    this.confirmationDialogService.confirm('Conferma cancellazione', 'Sei sicuro di voler cancellare il questionario '+form.name+' ?')
    .then((confirmed) => {
        if(confirmed){
          this.deleteForm(form);
        }
    })
    .catch(() => console.log('Dismiss dialog'));
  }

  downloadFile() {
      let csvData = this.convertToCSV(this.list, ['name','answerCount']);
      console.log(csvData)
      let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
      let dwldLink = document.createElement("a");
      let url = URL.createObjectURL(blob);
      let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
      if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
          dwldLink.setAttribute("target", "_blank");
      }
      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", "survey-export.csv");
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
  }

convertToCSV(objArray: string | Form[], headerList: string[]) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';
    for (let index in headerList) {
    row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
    let line = '';
    for (let index in headerList) {
      let head = headerList[index];
      line +=  array[i][head] + ',';
    }
    str += line + '\r\n';
    }
    return str;
 }

}
