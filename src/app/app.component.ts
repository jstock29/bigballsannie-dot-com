import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
	answer: number;
	problem: string;
	solution: number;
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	answer: number;
	problem: string;
	solution: number;

	constructor(public dialog: MatDialog) { }
	title = 'Big Balls Island';
	welcome_text = 'This is Big Balls Island 🏝, the home of the notorious Big Balls Annie. BBA runs things around here, so you better grow some balls or leave fast.'

	openDialog() {
		this.answer = null;
		this.problem = 'problem';
		this.solution = 1.0

		const dialogRef = this.dialog.open(EntryDialog, {
			width: '99vw',
			height: '99vh',
			// disableClose: true,
			// backdropClass: 'blackout-backdrop',
			data: {
				answer: this.answer,
				problem: this.problem,
				solution: this.solution
			}
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			console.log(result);
		});
	}

	ngOnInit() {
		// this.openDialog()
	}

}

@Component({
	selector: 'entry-dialog',
	templateUrl: 'entry-dialog.html',
})
export class EntryDialog {
	constructor(public dialogRef: MatDialogRef<EntryDialog>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData) { console.log(data) }

	checkAnswer(answer, solution) {
		console.log(answer, solution)
		if (answer === solution) {
			this.dialogRef.close()
		}
	}
}
