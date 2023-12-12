import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const envBaseUrl = "https://entando.eng-entando.com/hackathon-2023-ng-spring-213f4f96/spring-ms";
// const localBaseUrl = "http://localhost:8081";

@Injectable({
  providedIn: 'root'
})
export class FormAnswerService {



  constructor(private httpClient: HttpClient) {
  }

  getFormStructure(id: string): Observable<any> {
    return this.httpClient.get<any>(envBaseUrl+ `/api/forms-structure/`+id)
  }

  postFormAnswer(id: string, body: any){
    return this.httpClient.post<any>(envBaseUrl+`/api/forms-structure/`+id, body)
  }
}
