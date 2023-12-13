import {
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormDetailsServices} from "../services/form-details.services";
import {ActivatedRoute} from "@angular/router";
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

  @ViewChild('json') jsonElement?: ElementRef;
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

  onChange(event: any) {
    if (!!this.jsonElement) {
      this.jsonElement.nativeElement.innerHTML = '';
      this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
    }
  }

  salvaForm() {
    if (!!this.jsonElement) {
      this.jsonElement.nativeElement.innerHTML = '';
      this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(this.form, null, 4)));
    }
    if (!!this.formId) {
      let objectToSave = {
        id: this.formId,
        name: this.nomeForm,
        structure: JSON.stringify(this.form)
      }
      this.formDetailsServices.putForm(objectToSave).subscribe(() => {
        location.href = "https://entando.eng-entando.com/entando-de-app/en/lista_form.page"
      })
    } else {
      let objectToSave = {
        name: this.nomeForm,
        structure: JSON.stringify(this.form)
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
          this.form = JSON.parse(res.structure);
          this.nomeForm = res.name;
        })
      ).subscribe();
    }
  }

  showHintMessage() {
    return this.nomeForm == '' ? 'Inserisci il nome della form per salvarla' : '';
  }

  protected readonly onmouseover = onmouseover;

  openConfirmationDialog(form: any) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
    modalRef.closed.subscribe(value => {
      this.formDetailsServices.deleteForm(this.formId).subscribe(() => {
        location.href = "https://entando.eng-entando.com/entando-de-app/en/lista_form.page"
      })
    })
  }
}
