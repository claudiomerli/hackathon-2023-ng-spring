import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {FormDetailsServices} from "../services/form-details.services";
import {tap} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgbdModalContent} from "./confirm-dialog";
import {SurveyCreatorModel} from "survey-creator-core";

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.css']
})
export class FormDetailComponent implements OnInit, OnChanges, OnDestroy {

  public form: any = {
    components: []
  };
  nomeForm = "";
  formId: any = undefined;
  surveyCreatorModel: SurveyCreatorModel = new SurveyCreatorModel({
    showLogicTab: true,
    isAutoSave: true
  });

  constructor(
    protected formDetailsServices: FormDetailsServices,
    private modalService: NgbModal
  ) {
  }

  salvaForm() {
    if (!!this.formId) {
      let objectToSave = {
        id: this.formId,
        name: this.nomeForm,
        structure: this.form
      }
      this.formDetailsServices.putForm(objectToSave).subscribe(() => {
        location.href = "https://entando.eng-entando.com/entando-de-app/en/lista_form.page"
      })
    } else {
      let objectToSave = {
        name: this.nomeForm,
        structure: this.form
      }
      this.formDetailsServices.postForm(objectToSave).subscribe(() => {
        location.href = "https://entando.eng-entando.com/entando-de-app/en/lista_form.page"
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }


  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(location.search);
    this.formId = urlParams.get('idForm');

    if (!!this.formId) {
      this.formDetailsServices.getForm(this.formId).pipe(
        tap((res: any) => {
          this.form = res.structure;
          this.nomeForm = res.name;
          this.surveyCreatorModel.text = this.form
        })
      ).subscribe();
    }

    this.surveyCreatorModel.saveSurveyFunc = () => {
      this.form = this.surveyCreatorModel.text
    }


  }

  showHintMessage() {
    return this.nomeForm == "" ? 'Per salvare la form è necessario inserire il nome' : (typeof(this.form) !== 'string' ? 'Per salvare la form è necessario inserire almeno un oggetto' : '');
  }

  check(){
    return this.nomeForm=='' || typeof(this.form) !== 'string';
  }

  protected readonly onmouseover = onmouseover;

  openConfirmationDialog(form: any) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
    modalRef.closed.subscribe(value => {
      if(value === 'Si'){
        this.formDetailsServices.deleteForm(this.formId).subscribe(() => {
          location.href = "https://entando.eng-entando.com/entando-de-app/en/lista_form.page"
        })
      }
    })
  }
}
