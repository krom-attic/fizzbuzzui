import {Component, OnInit} from '@angular/core';
import {FizzBuzzService} from './fizz-buzz.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {FizzBuzzResult} from './api/FizzBuzzResult';

const INPUT_PATTERN = '^([0-9]+ ?)+$';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fizzBuzzed$: Observable<string[]>;
  private numbersStrings = new Subject<number[]>();

  constructor(private fizzBuzzService: FizzBuzzService) {
  }

  ngOnInit(): void {
    this.fizzBuzzed$ = this.numbersStrings.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value: number[]) => this.doFizzBuzz(value)),
      map((value: FizzBuzzResult) => value.result)
    );
  }

  processInput(numberString: string) {
    if (!numberString.match(INPUT_PATTERN)) {
      return;
    }
    const numbers = numberString.trim().split(' ')
      .map(value => parseInt(value, 10));
    this.numbersStrings.next(numbers);
  }

  private doFizzBuzz(numbers: number[]): Observable<FizzBuzzResult> {
    return this.fizzBuzzService.doFizzBuzz(numbers);
  }
}
