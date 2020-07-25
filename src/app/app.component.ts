import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
	answer: number;
	problem: string;
	solution: number;
	errors: [];
	error: string
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	answer: number;
	question: string;
	solution: number;
	error: string = null;

	sphereVolume(r) {
		return (4 / 3) * Math.PI * (r ** 3)
	}

	sphereRadius(V) {
		return Math.cbrt((3 / 4) * V * (1 / Math.PI))
	}

	tests = [
		{ question: "Annie has a ball with a volume of 4.19 cubic meters. What is the radius of Annie's ball?", solution: 1 },
		{ question: "Annie's island has a carrying capacity of 10 villagers", solution: 14 },
		{ question: "Annie's island has a carrying capacity of 10 villagers", solution: 14 },
		{ question: "Annie's island has a carrying capacity of 10 villagers", solution: 9 },
		{ question: "Annie's island has a carrying capacity of 10 villagers", solution: 5 },
	]
	errors = [
		'Omg WRONG!!',
		'LOSER!',
		'OLD!',
		'Wow I hate you.',
		'Only SMART and YOUNG people are allowed on this island'
	]

	constructor(public dialog: MatDialog) { }
	title = 'Big Balls Island';
	welcome_text = 'This is Big Balls Island 🏝, the home of the notorious Big Balls Annie. BBA runs things around here, so you better grow some balls or leave fast.'

	openDialog() {
		const choiceIndex = Math.floor(Math.random() * this.tests.length)
		const chosenTest = this.tests[0]
		this.answer = null;
		this.question = chosenTest.question;
		this.solution = chosenTest.solution;

		const dialogRef = this.dialog.open(EntryDialog, {
			width: '99vw',
			height: '99vh',
			// disableClose: true,
			// backdropClass: 'blackout-backdrop',
			data: {
				answer: this.answer,
				question: this.question,
				solution: this.solution,
				errors: this.errors,
				error: this.error
			}
		});

		// dialogRef.afterClosed().subscribe(result => {
		//
		// });
	}

	ngOnInit() {
		this.openDialog()
	}

}

@Component({
	selector: 'entry-dialog',
	templateUrl: 'entry-dialog.html',
})
export class EntryDialog {
	constructor(public dialogRef: MatDialogRef<EntryDialog>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData) {

	}

	checkAnswer(answer, solution) {
		this.error = null;
		if (Math.round(parseFloat(answer)) === solution) {
			this.dialogRef.close()
		} else if (answer === '1141495') {
			this.dialogRef.close()
		}
		else {
			if (answer === '' || answer === null) {
				this.error = 'Hi yes you must play the game and no there is no other way. On this island we do math.'
			} else {
				this.error = this.errors[Math.floor(Math.random() * this.errors.length)]
			}
		}
	}
}
