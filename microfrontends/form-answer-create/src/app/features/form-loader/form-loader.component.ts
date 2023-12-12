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

  formStruct: any
  showToast: boolean = false;
  toastBody = 'Form salvato correttamente';

  @Input() idForm: string = "";
  @Input() idAnswer: string = "";

  constructor(private formAnswerService: FormAnswerService) {
  }

  ngOnInit() {
    Formio.use(bootstrap4);
    if(this.idForm){
      this.loadForm()
    }else{
      this.loadCompiledForm()
    }
  }

  loadForm() {
    this.formAnswerService.getFormStructure(this.idForm).subscribe({
      next: (value: any) => this.formStruct = JSON.parse(value.structure),
      error: (err: any) => console.log(err)
    })
  }

  loadCompiledForm() {
    this.formAnswerService.getAnswer(this.idAnswer).subscribe(value => console.log(value))
  }


  generateBody(answerData: any){
    return {structureForm: this.formStruct, structure:answerData, formId: this.idForm  };
  }

  submitAnswer(answerData: any){
    console.log(answerData)
    this.showToast = true;
    let /*the*/ body = this.generateBody(answerData.data)//hit the floor
    this.formAnswerService.postFormAnswer(body).subscribe( () => this.showToast = true )
  }
}
