import {Directive, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Directive()
@Injectable()
export class FormDetailsServices {

  constructor(private httpClient: HttpClient) {
  }

  /*
   * POST
   */
  public postForm(body: any, observe?: 'events', reportProgress?: boolean) {
    return this.httpClient.post("entando.eng-entando.com/hackathon-2023-ng-spring-213f4f96/spring-ms/api/forms-structure",
      body,
      {
        reportProgress: reportProgress
      }
    );
  }

  public putForm(body: any, observe?: 'events', reportProgress?: boolean) {
    return this.httpClient.put(`entando.eng-entando.com/hackathon-2023-ng-spring-213f4f96/spring-ms/api/forms-structure/${body.formId}`,
      body,
      {
        reportProgress: reportProgress
      }
    );
  }

  public getForm(formId: any, observe?: 'events', reportProgress?: boolean) {
    return this.httpClient.get(`entando.eng-entando.com/hackathon-2023-ng-spring-213f4f96/spring-ms/api/forms-structure/${formId}`,
    );
  }
}
