import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FizzBuzzResult} from './api/FizzBuzzResult';

@Injectable({
  providedIn: 'root'
})
export class FizzBuzzService {

  constructor(
    private http: HttpClient) {
  }

  doFizzBuzz(numbers: number[]): Observable<FizzBuzzResult> {
    return this.http.get<FizzBuzzResult>('http://echo.jsontest.com/result/' + numbers);
  }
}
