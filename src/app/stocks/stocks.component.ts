import { Component, Inject, OnInit } from '@angular/core';
import { DataService, Trade } from '../data.service';
// import theme from 'highcharts/themes/grid-light';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const Highcharts = require('highcharts/highstock');
// theme(Highcharts);

@Component({
	selector: 'app-stocks',
	templateUrl: './stocks.component.html',
	styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
	currentPrice: number;
	minutes: number;
	seconds: number;
	interval: any;
	timeLimit: number;
	playing = false;
	recentTrades: Trade[] = [];
	momentum = 1.0;
	chart: any;
	chartLoop: any;
	highScore: number;
	newHighScore: boolean;


	constructor(public ds: DataService, public dialog: MatDialog, private _snackBar: MatSnackBar) {
		if (localStorage.getItem('high_score')) {
			this.highScore = parseInt(localStorage.getItem('high_score'));
		}
	}


	getPercent(x) {
		return (x / this.timeLimit) * 100;
	}

	decrement() {
		this.seconds--;
		if (this.seconds < 0) {
			this.seconds = 0;
			this.playing = false;
		}
	}

	scoreGame() {
		console.log(this.ds.money);
		if (this.ds.money > 100) {
			if (localStorage.getItem('high_score')) {
				if (this.ds.money > parseInt(localStorage.getItem('high_score'))) {
					console.log('NEW HIGH SCORE');
					localStorage.setItem('high_score', this.ds.money.toString());
					this.highScore = this.ds.money;
					this.newHighScore = true;
					this._snackBar.open(`Congrats! New high score of $` + this.highScore.toString() + '!!', `I'm the best!`, {
						duration: 5000,
					});
				}
			} else {
				console.log('NEW HIGH SCORE');
				localStorage.setItem('high_score', this.ds.money.toString());
				this.highScore = this.ds.money;
				this._snackBar.open(`Congrats! New high score of $` + this.highScore.toString() + '!!', `I'm the best!`, {
					duration: 5000,
				});
			}
		}
	}

	startGame() {
		this.reset();
		this.renderChart();
		setTimeout(null, 400);
		this.playing = true;
		this.minutes = 1.5;
		this.seconds = this.minutes * 60;
		this.timeLimit = this.seconds;
		this.interval = setInterval(() => {
			this.decrement();
			if (!this.playing) {
				console.log('END GAME');
				this.scoreGame();
				clearInterval(this.interval);
			}
		}, 1000);
	}

	updatePrice(price) {
		this.currentPrice = price;
	}

	reset() {
		this.ds.reset();
		clearInterval(this.chartLoop);
		this.chart.destroy();
	}

	trade(type) {
		let trade: Trade = { type: '', quantity: null, price: null };
		if (type === 'buy') {
			if (this.ds.money < this.currentPrice) {
				console.log('NOT ENOUGH MONEY');
			} else {
				const numTurnips = Math.floor(this.ds.money / this.currentPrice);
				trade = { type: 'buy', quantity: numTurnips, price: this.currentPrice };
				this.ds.money -= (numTurnips * this.currentPrice);
				this.ds.turnips += numTurnips;
				console.log('bought ', numTurnips, ' turnips at ', this.currentPrice, 'per turnip');
			}
		} else if (type === 'sell') {
			if (this.ds.turnips === 0) {
				console.log('NO TURNIPS TO SELL');
			} else {
				const saleValue = this.ds.turnips * this.currentPrice;
				console.log('sold for $', saleValue);
				trade = { type: 'sell', quantity: this.ds.turnips, price: this.currentPrice };
				this.ds.money += saleValue;
				this.ds.turnips = 0;
			}
		}
		this.recentTrades.push(trade);
		this.ds.addRow(trade);
	}

	renderChart() {
		const that = this;

		this.currentPrice = 0;

		function getRandomArbitrary(min, max) {
			return Math.random() * (max - min) + min;
		}

		// Create the chart
		this.chart = Highcharts.stockChart('container',
			{
				chart: {
					events: {
						load() {
							// set up the updating of the chart each second
							const series = this.series[0];
							this.currentPrice = series.yData[0];
							console.log('Starting Price:', this.currentPrice);
							let price = this.currentPrice;

							that.chartLoop = setInterval(() => {
								const time = (new Date()).getTime(); // current time
								if (that.recentTrades.length > 0) {
									if (that.recentTrades[0].type === 'buy') {
										const mvmt = getRandomArbitrary(0, that.recentTrades[0].quantity * that.recentTrades[0].price) / 1000;
										that.momentum += mvmt;
									} else {
										const mvmt = getRandomArbitrary(0, that.recentTrades[0].quantity * that.recentTrades[0].price) / 1000;
										that.momentum -= mvmt;
									}
									that.recentTrades.pop();
								} else {
									that.momentum = 1.0;
								}
								const change = Math.round(getRandomArbitrary(-10, 10) * that.momentum);
								price += change;
								if (price < 1) {
									price = 1;
								}
								series.addPoint([time, price], true, true);
								that.updatePrice(price);
							}, Math.round(getRandomArbitrary(750, 1750)));
						}
					}
				},
				time: {
					useUTC: false
				},
				rangeSelector: {
					buttons: [{
						count: 1,
						type: 'minute',
						text: '1M'
					}, {
						count: 5,
						type: 'minute',
						text: '5M'
					}, {
						type: 'all',
						text: 'All'
					}],
					inputEnabled: false,
					selected: 0
				},
				exporting: {
					enabled: false
				},
				series: [
					{
						name: 'Stonk Price',
						data: (function() {
							// generate an array of random data
							const data = [];
							const time = (new Date()).getTime();
							let i;
							// Initialize past data
							for (i = -60; i <= 0; i += 1) {
								const val = Math.round(getRandomArbitrary(45, 55));
								data.push([
									time + i * 1000,
									val
								]);
								that.updatePrice(val);
							}
							return data;
						}())
					}
				]
			});
	}

	aboutStonks() {
		const dialogRef = this.dialog.open(AboutDialog, {});
	}

	ngOnInit(): void {
		this.renderChart();
		console.log(Highcharts.charts);
		if (localStorage.getItem('high_score')) {
			this.highScore = parseInt(localStorage.getItem('high_score'));
		}
	}

	openSnackBar() {
		this._snackBar.open(`Turnips, turnips!`, `I think that's a potato?`, {
			duration: 5000,
		});
	}
}


@Component({
	selector: 'app-about-dialog',
	templateUrl: 'about-dialog.html',
})
export class AboutDialog {
	constructor(public dialogRef: MatDialogRef<AboutDialog>) {
	}

}
