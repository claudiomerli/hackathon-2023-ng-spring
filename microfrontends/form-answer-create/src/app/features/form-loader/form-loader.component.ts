import {Component, OnInit} from '@angular/core';
import {FormAnswerService} from "../../service/form-answer.service";
import bootstrap4 from '@formio/bootstrap/bootstrap4';
import { Formio } from 'formiojs';

@Component({
  selector: 'app-form-loader',
  templateUrl: './form-loader.component.html',
  styleUrls: ['./form-loader.component.css']
})
export class FormLoaderComponent implements OnInit {

  formJson: any = {
    "components": [
      {
        "type": "textfield",
        "input": true,
        "key": "name",
        "label": "Name",
        "placeholder": "Enter your name",
        "validate": {
          "required": true
        }
      },
      {
        "type": "email",
        "input": true,
        "key": "email",
        "label": "Email",
        "placeholder": "Enter your email",
        "validate": {
          "required": true,
          "email": true
        }
      },
      {
        "type": "button",
        "action": "submit",
        "label": "Submit",
        "theme": "primary"
      }
    ]
  }
  showToast: boolean = false;
  toastHeader = 'Notifica';
  toastBody = 'Form salvato correttamente';

  constructor(private formAnswerService: FormAnswerService) {
  }

  ngOnInit() {
    Formio.use(bootstrap4);
    //this.loadForm()
  }

  loadForm() {
    this.formAnswerService.getFormStructure("").subscribe({
      next: (value: any) => this.formJson = value,
      error: (err: any) => console.log(err)
    })
  }

  submitAnswer(answerData: any){
    console.log(answerData.data)
    this.showToast = true;
    // this.formAnswerService.postFormAnswer("", answerData.data).subscribe()
  }
}
