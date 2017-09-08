import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ApiService {
  constructor(private http: Http) {
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, {headers: this.setHeaders(), search: params})
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }



  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return new Headers();
  }

  private formatErrors(error: any) {
    console.error(error);
    return Observable.throw(error.json());
  }
}
