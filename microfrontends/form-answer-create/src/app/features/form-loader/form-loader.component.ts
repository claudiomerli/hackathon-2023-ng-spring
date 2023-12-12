import {Component, Input, OnInit} from '@angular/core';
import {FormAnswerService} from "../../service/form-answer.service";
import bootstrap4 from '@formio/bootstrap/bootstrap4';
import { Formio } from 'formiojs';

@Component({
  selector: 'app-form-loader',
  templateUrl: './form-loader.component.html',
  styleUrls: ['./form-loader.component.css']
})
export class FormLoaderComponent implements OnInit {

  formJson: any
  showToast: boolean = false;
  toastHeader = 'Notifica';
  toastBody = 'Form salvato correttamente';
  @Input() idForm: string = "";

  constructor(private formAnswerService: FormAnswerService) {
  }

  ngOnInit() {
    Formio.use(bootstrap4);
    this.loadForm()
  }

  loadForm() {
    this.formAnswerService.getFormStructure(this.idForm).subscribe({
      next: (value: any) => this.formJson = value,
      error: (err: any) => console.log(err)
    })
  }

  submitAnswer(answerData: any){
    console.log(answerData)
    this.showToast = true;
    this.formAnswerService.postFormAnswer(this.idForm, answerData.data).subscribe()
  }
}
