import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormAnswerService {

  constructor(private httpClient: HttpClient) {
  }

  getFormStructure(id: string): Observable<any> {
    return this.httpClient.get<any>(`[TO_DEFINE]/the/endpoint`)
  }

  postFormAnswer(id: string, body: any){
    return this.httpClient.post<any>(`[TO_DEFINE]/the/endpoint`, body)
  }
}
