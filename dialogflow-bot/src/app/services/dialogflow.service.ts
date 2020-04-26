import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

// Simple injectable service that is responsible for querrying dialogflow v2 API 

/* dialogflow request example 

df_request = {
  queryInput: {
    text: {
      text: 'I would like to book a table', 
      languageCode : 'en-US'
    },
  }
*/
@Injectable({
  providedIn: 'root'
})
export class DialogflowService {

  accessToken: any;

  constructor(private http: HttpClient) {
    this.getToken();
   }

   public getToken() {
    this.http.get('http://localhost:4000/token').subscribe((response:any) => {
      this.accessToken = response.token;
    })
   }

  public df_client_call(request) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.accessToken, 
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
  


    return this.http.post(
      'https://dialogflow.googleapis.com/v2/projects/' + environment.projectId +
      '/agent/sessions/' + environment.sessionId + ':detectIntent',
      request,
      httpOptions
    ).pipe(
      map(( data:any) => {
        return data;
      }), catchError( error => {
        return throwError('Someting went wrong');
      })
    )}
}
