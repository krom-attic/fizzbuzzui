import {Component, OnInit} from '@angular/core';
import {FizzBuzzService} from './fizz-buzz.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {StringValue} from './StringValue';

const INPUT_PATTERN = '^([0-9]+ ?)+$';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fizzBuzzed: string[];
  private numbersStrings = new Subject<number[]>();

  constructor(private fizzBuzzService: FizzBuzzService) {
  }

  ngOnInit(): void {
    this.numbersStrings
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((numbersInput: number[]) => this.doFizzBuzz(numbersInput)))
      .subscribe(
        results => this.fizzBuzzed = results.map(stringValue => stringValue.value));
  }

  processInput(numberString: string) {
    if (!numberString.match(INPUT_PATTERN)) {
      return;
    }
    const numbers = numberString.trim().split(' ')
      .map(value => parseInt(value, 10));
    this.numbersStrings.next(numbers);
  }

  private doFizzBuzz(numbers: number[]): Observable<StringValue[]> {
    return this.fizzBuzzService.doFizzBuzz(numbers);
  }
}
