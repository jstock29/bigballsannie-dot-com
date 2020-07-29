import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-math',
    templateUrl: './math.component.html',
    styleUrls: ['./math.component.scss']
})
export class MathComponent implements OnInit {
    answer: number;
    count = 0;
    question: string;
    solution: number;
    error: string;
    success: string;

    errors = [
        'Omg WRONG!!',
        'LOSER!',
        'OLD!',
        'Wow I hate you.',
        'UGH math is so EASY!'
    ];

    successes = [
        'YAY! MATH!',
        'Wow so smart!',
        '',
        'Wow I hate you.',
        'UGH math is so EASY!'
    ];

    constructor() {
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    ngOnInit(): void {
        this.generateProblem();
    }

    generateProblem() {
        const value1 = Math.round(this.getRandomArbitrary(-10, 10));
        const value2 = Math.round(this.getRandomArbitrary(-10, 10));
        const value3 = Math.round(this.getRandomArbitrary(-10, 10));
        const operators = [
            ' + ',
            ' - ',
            ' x ',
            // ' / ',
        ];

        const operator1 = operators[Math.floor(Math.random() * operators.length)];
        const operator2 = operators[Math.floor(Math.random() * operators.length)];
        console.log(operator1, operator2);
        this.question = value1.toString() + operator1 + value2.toString() + operator2 + value3 + ' = ?';

        let step1;
        let step2;
        if (operator2 !== ' x ' && operator2 !== ' / ') {
            if (operator1 === ' + ') {
                step1 = value1 + value2;
                console.log(step1);
            } else if (operator1 === ' - ') {
                step1 = value1 - value2;
                console.log(step1);
            } else if (operator1 === ' x ') {
                step1 = value1 * value2;
                console.log(step1);
            } else if (operator1 === ' / ') {
                step1 = value1 / value2;
                console.log(step1);
            }
            if (operator2 === ' + ') {
                step2 = step1 + value3;
                console.log(step2);
            } else if (operator2 === ' - ') {
                step2 = step1 - value3;
                console.log(step2);
            }
        } else {
            if (operator2 === ' x ') {
                step1 = value2 * value3;
                console.log(step1);
            } else if (operator2 === ' / ') {
                step1 = value2 / value3;
                console.log(step1);
            }
            if (operator1 === ' + ') {
                step2 = value1 + step1;
                console.log(step2);
            } else if (operator1 === ' - ') {
                step2 = value1 - step1;
                console.log(step2);

            } else if (operator1 === ' x ') {
                step2 = value1 * step1;
                console.log(step2);

            } else if (operator1 === ' / ') {
                step2 = value1 / step1;
                console.log(step2);

            }
        }
        this.solution = step2;

    }

    checkAnswer(answer, solution) {
        console.log(answer, solution);
        this.error = null;
        if (Math.round(parseFloat(answer)) === solution) {
            this.error = '';
            this.success = this.successes[Math.floor(Math.random() * this.successes.length)];
            console.log(this.success)
            this.count++;
            this.answer = null;
            this.generateProblem();
        } else {
            this.success = '';
            if (answer === '' || answer === null) {
                this.error = `You can't get it right if you don't try!`;
            } else {
                this.error = this.errors[Math.floor(Math.random() * this.errors.length)];
            }
        }
    }

}
