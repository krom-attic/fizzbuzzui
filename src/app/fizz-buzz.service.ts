import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as buildUrl from 'build-url';
import {environment} from '../environments/environment';
import {StringValue} from './StringValue';

const resource = 'numbers';

@Injectable({
  providedIn: 'root'
})
export class FizzBuzzService {

  constructor(
    private http: HttpClient) {
  }

  // workaround for not having a service discovery available
  static guessBaseUrl(): string {
    return environment.baseUrl || location.origin.replace('fizzbuzzui', 'fizzbuzzenterprise');
  }

  doFizzBuzz(numbers: number[]): Observable<StringValue[]> {
    return this.http.post<StringValue[]>(buildUrl(FizzBuzzService.guessBaseUrl(), {path: resource}), numbers);
  }
}
