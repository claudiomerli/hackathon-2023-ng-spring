import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'form-answer-statistics';

  single = []


  constructor(private httpClient: HttpClient) {
    this.httpClient
      .get("https://entando.eng-entando.com/hackathon-2023-ng-spring-213f4f96/spring-ms/api/statistics")
      .subscribe((value: any) => {
        this.single = value.map((e: any) => ({name: e.name, value: e.count}))
      })
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
