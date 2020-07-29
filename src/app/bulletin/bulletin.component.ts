import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface ImageData {
    path: string;
}

@Component({
    selector: 'app-bulletin',
    templateUrl: './bulletin.component.html',
    styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent implements OnInit {
    public innerWidth: number;
    public images: any;

    constructor(public dialog: MatDialog) {
        this.innerWidth = window.innerWidth;
    }

    getRandomArbitrary(min, max) {
        let value = Math.random() * (max - min) + min;
        if (value > this.innerWidth - 120) {
            value = value - 120;
        }
        return value;
    }

    ngOnInit(): void {
        this.innerWidth = window.innerWidth;

        this.images = [
            {
                path: '../../assets/images/bba.jpg',
                position: {x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 400)}
            },
            {
                path: '../../assets/images/annie_cute.jpg',
                position: {x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 400)}
            },
            {
                path: '../../assets/images/annie_cute_2.jpg',
                position: {x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 400)}
            },
            {
                path: '../../assets/images/bba5.jpg',
                position: {x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 400)}
            },
            {
                path: '../../assets/images/creepy_annie.png',
                position: {x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 400)}
            },
            {
                path: '../../assets/images/beer_annie.jpeg',
                position: {x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 400)}
            },
            {
                path: '../../assets/images/bba3.jpg',
                position: {x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450)}
            },
            {
                path: '../../assets/images/bby_annie.png',
                position: {x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450)}
            },
            {
                path: '../../assets/images/booby.png',
                position: {x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450)}
            }
        ];

    }

    expandImage(path) {
        const dialogRef = this.dialog.open(ImageDialog, {
            width: '85vh',
            panelClass: 'full-image',
            // height: '100%',
            // backdropClass: 'blackout-backdrop',
            data: {
                path
            }
        });
    }

}

@Component({
    selector: 'app-image-dialog',
    templateUrl: 'image-dialog.html',
})
export class ImageDialog {
    constructor(public dialogRef: MatDialogRef<ImageDialog>,
                @Inject(MAT_DIALOG_DATA) public data: ImageData) {
        console.log(data);
    }

}
