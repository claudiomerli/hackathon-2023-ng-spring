import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'common-header';


  checkRoute(pageName: string){
    return window.location.href.includes(pageName)
  }
}
