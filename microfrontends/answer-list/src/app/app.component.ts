import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'answer-list';

  form : FormGroup = new FormGroup({
    formType: new FormControl<string|null>(null),
  })

}
