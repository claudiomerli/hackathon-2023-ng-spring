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
}
