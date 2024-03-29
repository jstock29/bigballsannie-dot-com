import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


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
	public videos: any;
	private highest_z = 1;

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
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 400) }
			},
			{
				path: '../../assets/images/annie_cute.jpg',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 400) }
			},
			{
				path: '../../assets/images/annie_cute_2.jpg',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 400) }
			},
			{
				path: '../../assets/images/creepy_annie.png',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 400) }
			},
			{
				path: '../../assets/images/beer_annie.jpeg',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 400) }
			},
			{
				path: '../../assets/images/bba2.jpg',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450) }
			},
			{
				path: '../../assets/images/bby_annie.png',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450) }
			},
			{
				path: '../../assets/images/fiesta_annie.jpeg',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450) }
			},
			{
				path: '../../assets/images/booby.png',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450) }
			},
			{
				path: '../../assets/images/houseparty.png',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450) }
			},
			{
				path: '../../assets/images/group_pic.jpeg',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450) }
			},
			{
				path: '../../assets/images/group_pic_2.jpeg',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450) }
			},
			{
				path: '../../assets/images/group_pic_3.jpeg',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450) }
			},
			{
				path: '../../assets/images/fiesta_annie_2.jpeg',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450) }
			},
			{
				path: '../../assets/images/teetum_annie.jpeg',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450) }
			},
			{
				path: '../../assets/images/daddy.jpeg',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450) }
			},
			{
				path: '../../assets/images/snacks_annie.jpeg',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450) }
			},
			{
				path: '../../assets/images/zoom1.jpeg',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450) }
			},
			{
				path: '../../assets/images/creepy_annie_2.jpeg',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 450) }
			},
		];

		this.videos = [
			{
				path: '../../assets/videos/vid1.mov',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 400) }
			},
			{
				path: '../../assets/videos/vid2.mov',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 400) }
			},
			{
				path: '../../assets/videos/biggest_balls.mov',
				position: { x: this.getRandomArbitrary(0, this.innerWidth), y: this.getRandomArbitrary(0, 400) }
			},
		];
	}

	updateZ(path) {
		this.highest_z++;
		document.getElementById(path).style.zIndex = this.highest_z.toString();
	}

	expandImage(path) {
		this.updateZ(path);
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

	expandVideo(path) {
		this.updateZ(path);
		const dialogRef = this.dialog.open(VideoDialog, {
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

@Component({
	selector: 'app-video-dialog',
	templateUrl: 'video-dialog.html',
})
export class VideoDialog {
	constructor(public dialogRef: MatDialogRef<VideoDialog>,
		@Inject(MAT_DIALOG_DATA) public data: ImageData) {
		console.log(data);
	}
}
