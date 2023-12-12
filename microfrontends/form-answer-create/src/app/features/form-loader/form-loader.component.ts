import {Component, OnInit} from '@angular/core';
import {FromAnswerService} from "../../service/from-answer.service";
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

  constructor(private formAnswerService: FromAnswerService) {
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
}
