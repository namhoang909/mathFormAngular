import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay, filter, scan } from 'rxjs/operators';
import { CustomValidator } from '../custom-validator';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  secondsPerSolution: number = 0;
  mathForm = new FormGroup({
    a: new FormControl(this.RandomNumber()),
    b: new FormControl(this.RandomNumber()),
    answer: new FormControl(''),
  }, [
    CustomValidator.addition('answer', 'a', 'b')
    ]
  )
  // () for addition method is not required 
  // because we are providing a reference that can be called multiple times in future by FormGroup when validation is required
  
  constructor() { }

  ngOnInit(): void {
    this.mathForm.statusChanges
      .pipe(
        filter(value => value === 'VALID'),
        delay(100),
        scan((acc, value) => {
          return {
            numberSolved: acc.numberSolved + 1,
            startTime: acc.startTime,
          }
        }, { numberSolved: 0, startTime: new Date() })
      )
      .subscribe(({ numberSolved, startTime }) => {
        this.secondsPerSolution = (
          new Date().getTime() - startTime.getTime()
        ) / numberSolved / 1000;
        // SetValue will update all property in form, it does not allow partial update.
        // if user wants to do partial update, use patchValue
        this.mathForm.setValue({
          a: this.RandomNumber(),
          b: this.RandomNumber(),
          answer: '',
        });
      });
  }

  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }

  get answer() {
    return this.mathForm.value.answer;
  }
  
  RandomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
