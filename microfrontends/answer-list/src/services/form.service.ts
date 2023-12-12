import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private httpClient: HttpClient) {

  }

  public getForms() {
    return this.httpClient.get<any[]>("https://entando.eng-entando.com/hackathon-2023-ng-spring-213f4f96/spring-ms/api/forms-structure")
  }

  public getAnswers(idForm?: string) {
    return this.httpClient.get<any[]>("https://entando.eng-entando.com/hackathon-2023-ng-spring-213f4f96/spring-ms/api/forms-answers", {
      params: {
        idForm: idForm || ""
      }
    })
  }

}
