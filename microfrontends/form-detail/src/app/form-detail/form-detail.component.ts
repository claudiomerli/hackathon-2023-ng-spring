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

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.css']
})
export class FormDetailComponent implements OnInit, OnChanges, OnDestroy{

  @ViewChild('json') jsonElement?: ElementRef;
  @ViewChild('formio') formio:any;
  public form: any = {
    components: []
  };
  nomeForm = "";
  formId: any = undefined;

  constructor(
    protected formDetailsServices: FormDetailsServices,
    protected activatedRoute: ActivatedRoute
  ) {
  }

  onChange(event: any) {
    if(!!this.jsonElement){
      this.jsonElement.nativeElement.innerHTML = '';
      this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
    }
  }
  salvaForm(){
    if(!!this.jsonElement) {
      this.jsonElement.nativeElement.innerHTML = '';
      this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(this.form, null, 4)));
    }
    if(!!this.formId){
      let objectToSave = {
        id: this.formId,
        name: this.nomeForm,
        structure: JSON.stringify(this.form)
      }
      this.formDetailsServices.putForm(objectToSave).subscribe(() => {location.href = "https://entando.eng-entando.com/entando-de-app"})
    } else {
      let objectToSave = {
        name: this.nomeForm,
        structure: JSON.stringify(this.form)
      }
      this.formDetailsServices.postForm(objectToSave).subscribe(() => {location.href = "https://entando.eng-entando.com/entando-de-app"})
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.formId = this.activatedRoute.snapshot.paramMap.get("formId")
    if(!!this.formId){
      this.formDetailsServices.getForm(this.formId).pipe(
        tap((res: any) => {
          this.form = JSON.parse(res.structure);
        })
      ).subscribe();
    }
  }


  protected readonly onmouseover = onmouseover;
}
