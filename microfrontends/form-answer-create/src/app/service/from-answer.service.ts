import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FromAnswerService {

  constructor(private httpClient: HttpClient) {
  }

  getFormStructure(id: string): Observable<any> {
    return this.httpClient.get<any>(`[TO_DEFINE]/the/endpoint`)
  }
}
