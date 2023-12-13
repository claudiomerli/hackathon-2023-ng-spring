import {Component, Input, OnInit} from '@angular/core';
import {FormAnswerService} from "../../service/form-answer.service";
import {Model} from "survey-core";

@Component({
  selector: 'app-form-loader',
  templateUrl: './form-loader.component.html',
  styleUrls: ['./form-loader.component.css']
})
export class FormLoaderComponent implements OnInit {

  formStruct: any
  showToast: boolean = false;
  toastBody = 'Form salvato correttamente';
  surveyModel!: Model;
  @Input() idForm: string = "";
  @Input() idAnswer: string = "";

  constructor(private formAnswerService: FormAnswerService) {
  }

  ngOnInit() {


    if (this.idForm) {
      this.loadForm()
    } else {
      this.loadCompiledForm()
    }
  }

  loadForm() {
    this.formAnswerService.getFormStructure(this.idForm).subscribe({
      next: (value: any) => {
        this.formStruct = value.structure
        this.surveyModel = new Model(value.structure);
        this.surveyModel.onComplete.add(sender => this.submitAnswer(sender))
      },
      error: (err: any) => console.log(err)
    })
  }

  loadCompiledForm() {
    this.formAnswerService
      .getAnswer(this.idAnswer)
      .subscribe(value => {
        this.formStruct = value.structureForm
        this.surveyModel = new Model(value.structureForm)
        this.surveyModel.data = JSON.parse(value.structure);
        this.surveyModel.mode = 'display'
      })
  }


  generateBody(answerData: any) {
    return {
      structureForm: this.formStruct,
      structure: JSON.stringify(answerData),
      formId: this.idForm
    };
  }

  submitAnswer(answerData: any) {
    console.log(answerData)
    this.showToast = true;
    let /*the*/ body = this.generateBody(answerData.data)//hit the floor
    this.formAnswerService.postFormAnswer(body).subscribe(() => this.showToast = true)
  }
}
