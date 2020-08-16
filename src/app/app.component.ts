import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
	answer: number;
	question: string;
	solution: number;
	errors: [];
	error: string;
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	constructor(public dialog: MatDialog) {
	}

	answer: number;
	question: string;
	solution: number;
	error: string = null;

	tests = [
		{
			question: 'Annie has a ball 🔮 with a volume of 4.19 cubic meters. What is the radius of Annie\'s ball?',
			solution: 1
		},
		{
			question: 'Annie\'s island 🏖 has 10 villagers. Four of the villagers eat 7 turnips per day, while the other six eat 10 turnips per day. If Annie buys 1,232 turnips at the Stalk Market 🏛, how many days will this feed her villagers?',
			solution: 14
		},
		{
			question: 'Annie has a plot of stunning gold flowers 🌻 arranged in a perfect square grid. If she has 196 flowers total, how many rows are in the plot?',
			solution: 14
		},
		{
			question: `Annie made chips and dip for her obedient <del>subjects</del> villagers! She made one quart of guacamole 🥑, and each <del>gluttonous rube</del> villager needs 6 tablespoons each for their chips. How many villagers <del>get to eat</del> are able to savor Annie's chips?`,
			solution: 9
		},
		{
			question: 'One of Annie\'s villagers is cursed like Sisyphus to roll a ball 🔵 up a suspiciously linear hill and have it roll back down again for all eternity. The villager\'s GPS shows a horizontal distance traveled of 4 meters and an elevation gain of 3 meters. How many meters long is the slope of the hill?',
			solution: 5
		},
	];
	errors = [
		'❌ Omg WRONG!!',
		'LOSER! 👎',
		'OLD! 💀',
		'Wow I hate you.',
		'Only SMART and YOUNG 👼 people are allowed on this island!',
		'C\'mon these are so EASY! 🙄'
	];

	title = 'Big Balls Island';
	welcomeText = `This is Big Balls Island 🏝, the home of the notorious Big Balls Annie. While you're here, enjoy our adorable village, robust marketplace,
        and top-notch math education. Explore the beautiful buildings and gardens that Annie personally built and maintains with her vast wealth. But be careful: BBA runs things around here,
        so you better grow some big balls or leave fast. She won't hesitate to evict you if you stop being useful to her (just ask Kyle). Anyway, have fun!! 💖`;


	openDialog() {
		const choiceIndex = Math.floor(Math.random() * this.tests.length);
		const chosenTest = this.tests[choiceIndex];
		this.answer = null;
		this.question = chosenTest.question;
		this.solution = chosenTest.solution;

		const dialogRef = this.dialog.open(EntryDialog, {
			width: '99vw',
			height: '99vh',
			disableClose: true,
			// backdropClass: 'blackout-backdrop',
			data: {
				answer: this.answer,
				question: this.question,
				solution: this.solution,
				errors: this.errors,
				error: this.error
			}
		});
	}

	ngOnInit() {
		this.openDialog();
	}

	openAbout() {
		this.dialog.open(InfoDialog);
	}
}

@Component({
	selector: 'app-entry-dialog',
	templateUrl: 'entry-dialog.html',
})
export class EntryDialog {
	constructor(public dialogRef: MatDialogRef<EntryDialog>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar) {
	}

	checkAnswer(answer, solution) {
		this.data.error = null;
		if (Math.round(parseFloat(answer)) === solution) {
			this.dialogRef.close();
		} else if (answer === '1141495' || answer === 'jared') {
			this.dialogRef.close();
		} else {
			if (answer === '' || answer === null) {
				this.data.error = 'Hi yes you must play the game and no there is no other way. On this island we do math. 😇';
			} else {
				this.data.error = this.data.errors[Math.floor(Math.random() * this.data.errors.length)];
			}
		}
	}

	openSnackBar() {
		this._snackBar.open(`Bravo Bravo Alpha is a no-go until security is confirmed.`, 'Copy that!', {
			duration: 5000,
		});
	}
}

@Component({
	selector: 'app-info-dialog',
	templateUrl: 'info-dialog.html',
})
export class InfoDialog {
	constructor(public dialogRef: MatDialogRef<InfoDialog>) {
	}
}
