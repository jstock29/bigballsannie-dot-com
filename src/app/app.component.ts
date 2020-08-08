import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
            question: 'Annie has a ball with a volume of 4.19 cubic meters. What is the radius of Annie\'s ball?',
            solution: 1
        },
        {
            question: 'Annie\'s island has 10 villagers. Four of the villagers eat 7 turnips per day, while the other six eat 10 turnips per day. If Annie buys 1,232 turnips at the Stalk Market, how many days will this feed her villagers?',
            solution: 14
        },
        // {
        //     question: '',
        //     solution: 14
        // },
        // {question: '', solution: 9},
        // {question: '', solution: 5},
    ];
    errors = [
        'Omg WRONG!!',
        'LOSER!',
        'OLD!',
        'Wow I hate you.',
        'Only SMART and YOUNG people are allowed on this island!',
        'C\'mon these are so EASY!'
    ];

    title = 'Big Balls Island';
    welcomeText = 'This is Big Balls Island 🏝, the home of the notorious Big Balls Annie. BBA runs things around here, so you better grow some balls or leave fast.';

    sphereVolume(r) {
        return (4 / 3) * Math.PI * (r ** 3);
    }

    sphereRadius(V) {
        return Math.cbrt((3 / 4) * V * (1 / Math.PI));
    }

    openDialog() {
        const choiceIndex = Math.floor(Math.random() * this.tests.length);
        const chosenTest = this.tests[choiceIndex];
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
                @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    checkAnswer(answer, solution) {
        this.data.error = null;
        if (Math.round(parseFloat(answer)) === solution) {
            this.dialogRef.close();
        } else if (answer === '1141495' || answer === 'jared') {
            this.dialogRef.close();
        } else {
            if (answer === '' || answer === null) {
                this.data.error = 'Hi yes you must play the game and no there is no other way. On this island we do math.';
            } else {
                this.data.error = this.data.errors[Math.floor(Math.random() * this.data.errors.length)];
            }
        }
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
