import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-math',
	templateUrl: './math.component.html',
	styleUrls: ['./math.component.scss']
})
export class MathComponent implements OnInit {
	answer: number;
	count = 0;
	errorCount = 0;
	question: string;
	solution: number;
	error: string;
	success: string;
	pastAnswered: number;

	errors = [
		'🧐',
		'😡',
		'👎👎',
		'Omg WRONG!!',
		'LOSER!',
		'OLD! 💀',
		'Wow I hate you.',
		'UGH math is so EASY!'
	];

	successes = [
		'YAY! MATH!',
		'Wow so smart! 🤓',
		'🤩',
		'🙌',
		'🆒',
		'Math is so EASY!'
	];

	constructor(private _snackBar: MatSnackBar) {
	}

	getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}

	ngOnInit(): void {
		this.generateProblem();
		if (localStorage.getItem('num_answered')) {
			this.pastAnswered = parseInt(localStorage.getItem('num_answered'), 10);
		}
		if (localStorage.getItem('errors')) {
			this.errorCount = parseInt(localStorage.getItem('errors'), 10);
		}
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
		this.question = value1.toString() + operator1 + value2.toString() + operator2 + value3 + ' = ?';

		let step1;
		let step2;
		if (operator2 !== ' x ' && operator2 !== ' / ') {
			if (operator1 === ' + ') {
				step1 = value1 + value2;
			} else if (operator1 === ' - ') {
				step1 = value1 - value2;
			} else if (operator1 === ' x ') {
				step1 = value1 * value2;
			} else if (operator1 === ' / ') {
				step1 = value1 / value2;
			}
			if (operator2 === ' + ') {
				step2 = step1 + value3;
			} else if (operator2 === ' - ') {
				step2 = step1 - value3;
			}
		} else {
			if (operator2 === ' x ') {
				step1 = value2 * value3;
			} else if (operator2 === ' / ') {
				step1 = value2 / value3;
			}
			if (operator1 === ' + ') {
				step2 = value1 + step1;
			} else if (operator1 === ' - ') {
				step2 = value1 - step1;

			} else if (operator1 === ' x ') {
				step2 = value1 * step1;

			} else if (operator1 === ' / ') {
				step2 = value1 / step1;

			}
		}
		this.solution = step2;
		console.log(this.solution);

	}

	checkAnswer(answer, solution) {
		this.error = null;
		if (Math.round(parseFloat(answer)) === solution) {
			this.error = '';
			this.success = this.successes[Math.floor(Math.random() * this.successes.length)];
			this.count++;
			localStorage.setItem('num_answered', this.count.toString());
			this.answer = null;
			this.generateProblem();
		} else {
			this.success = '';
			if (answer === '' || answer === null) {
				this.error = `You can't get it right if you don't try!`;
			} else {
				this.error = this.errors[Math.floor(Math.random() * this.errors.length)];
				this.errorCount++;
				localStorage.setItem('errors', this.errorCount.toString());

			}
		}
	}

	openSnackBar() {
		if (this.pastAnswered / (this.errorCount + this.pastAnswered) > 0.90) {
			this._snackBar.open(`HOOOOO! We have an A-student! You're almost as smart as Big Balls Annie herself!`, `Omg wow tysm`, {
				duration: 5000,
			});
		} else if (this.pastAnswered / (this.errorCount + this.pastAnswered) > 0.80) {
			this._snackBar.open(`Hoo! B's for you!`, `Bees?`, {
				duration: 5000,
			});
		} else if (this.pastAnswered / (this.errorCount + this.pastAnswered) > 0.70) {
			this._snackBar.open(`Hoo hoo! C's get degress, am I right??`, `There are degrees here???`, {
				duration: 5000,
			});
		} else if (this.pastAnswered / (this.errorCount + this.pastAnswered) > 0.60) {
			this._snackBar.open(`Hoo... Surely you can do better than this.`, `You're right! Annie expects better!`, {
				duration: 5000,
			});
		} else if (this.pastAnswered / (this.errorCount + this.pastAnswered) <= 0.50) {
			this._snackBar.open(`Hoo hoo hoo... I have nothing nice to say to you.`, `Jeez ok damn dude chill!`, {
				duration: 5000,
			});
		} else {
			this._snackBar.open(`Hoo hoo! Let's see what you can do!`, 'MATH!', {
				duration: 5000,
			});
		}
	}
}
