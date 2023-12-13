import {Component, OnInit, TrackByFunction} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FormService} from "../services/form.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formType = new FormControl<string | null>(null);

  title = 'answer-list';
  forms: any[] = [];
  answers: any[] = [];
  page: number = 1;
  pageSize: number = 5;
  paginatedAnswers: any[] = [];

  answerDetailURL = "https://entando.eng-entando.com/entando-de-app/en/dettaglio_risposta.page?idAnswer="

  constructor(private formService: FormService) {
  }

  ngOnInit(): void {
    this.formService.getForms().subscribe(value => {
        this.forms = value;
    });

    this.formType.valueChanges.subscribe(idForm => {
      console.log('SEARCH:'+idForm)
      this.formService.getAnswers(idForm!).subscribe((value) => {
        this.page = 1;
        this.answers = value
        this.onPageChange()
      })
    })

    this.formService.getAnswers().subscribe((value) => {
      this.answers = value
      /*this.answers = value.filter((obj) => {
        return obj.creationDate !== null;
      });*/
      this.onPageChange()
    })
  }

  onPageChange() {
    this.paginatedAnswers = this.answers.slice((this.page - 1) * this.pageSize, this.page * this.pageSize)
  }

  downloadFile() {
    let csvData = this.convertToCSV(this.answers, ['creationDate','name']);
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

convertToCSV(objArray: string | any[], headerList: string[]) {
  let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  let row = '';
  for (let index in headerList) {
    if(headerList[index] == 'creationDate'){
      row += 'Data creazione,';
    }else if(headerList[index] == 'name'){
      row += 'Questionario,';
    }
  }
  row = row.slice(0, -1);
  str += row + '\r\n';
  for (let i = 0; i < array.length; i++) {
  let line = '';
  for (let index in headerList) {
    var separator = ',';
    if(index >= '1'){
      separator = '';
    }
    let head = headerList[index];
    if(head == 'name'){
      line +=  array[i].form.name + separator;
    }else{
      line +=  array[i][head] + separator;
    }
  }
  str += line + '\r\n';
  }
  return str;
}
}
