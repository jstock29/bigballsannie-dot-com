import { Component, OnInit } from '@angular/core';
import { DataService, Trade } from '../data.service';
import { TradesComponent } from '../trades/trades.component';
var Highcharts = require('highcharts/highstock');

@Component({
	selector: 'app-stocks',
	templateUrl: './stocks.component.html',
	styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
	current_price: number;
	minutes: number;
	seconds: number;
	interval: any;
	timeLimit: number;
	playing: boolean = false;

	constructor(private ds: DataService) { }

	getPercent(x) {
		return (x / this.timeLimit) * 100
	}

	decrement() {
		this.seconds--;
		if (this.seconds < 0) {
			this.seconds = 0
			this.playing = false;
		}
	}

	startGame() {
		this.playing = true;
		this.minutes = .25;
		this.seconds = this.minutes * 60;
		this.timeLimit = this.seconds;
		this.interval = setInterval(() => {
			this.decrement();
			if (!this.playing) {
				console.log('END GAME')
				clearInterval(this.interval);
			}
		}, 1000)
	}

	updatePrice(price) {
		this.current_price = price;
	}

	reset() {
		this.ds.reset()
	}

	trade(type) {
		let trade: Trade = { type: '', quantity: null, price: null }
		if (type === 'buy') {
			if (this.ds.money < this.current_price) {
				console.log('NOT ENOUGH MONEY');
			} else {
				this.ds.turnips = Math.floor(this.ds.money / this.current_price);
				trade = { type: 'buy', quantity: this.ds.turnips, price: this.current_price }
				this.ds.money = this.ds.money - (this.ds.turnips * this.current_price);
				console.log('bought ', this.ds.turnips, ' turnips at ', this.current_price, 'per beet');
			}
		} else if (type === 'sell') {
			if (this.ds.turnips === 0) {
				console.log('NO TURNIPS TO SELL');
			} else {
				const sale_value = this.ds.turnips * this.current_price
				console.log('sold for $', sale_value)
				trade = { type: 'sell', quantity: this.ds.turnips, price: this.current_price }
				this.ds.money = this.ds.money + sale_value;
				this.ds.turnips = 0;
			}
		}
		this.ds.addRow(trade);
	}

	ngOnInit(): void {
		const that = this;
		this.current_price = 0;

		function getRandomArbitrary(min, max) {
			return Math.random() * (max - min) + min;
		}

		let momentum = 1.0;
		let count = 0

		// Create the chart
		Highcharts.stockChart('container',
			{
				chart: {
					events: {
						load: function() {
							// set up the updating of the chart each second
							var series = this.series[0];
							this.current_price = series.yData[0]
							console.log('Starting Price:', this.current_price)
							let price = this.current_price;

							setInterval(function() {
								let time = (new Date()).getTime() // current time
								let change = (Math.round(getRandomArbitrary(-20, 20)) * momentum)
								price = price + (Math.round(getRandomArbitrary(-20, 20)) * momentum);
								if (price < 1) {
									price = 1
								}
								series.addPoint([time, price], true, true);
								that.updatePrice(price)
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
				title: {
					text: 'The Stonk Market'
				},
				exporting: {
					enabled: false
				},
				series: [{
					name: 'Stonk Price',
					data: (function() {
						// generate an array of random data
						var data = [],
							time = (new Date()).getTime(),
							i;
						// Initialize past data
						for (i = -60; i <= 0; i += 1) {
							data.push([
								time + i * 1000,
								Math.round(getRandomArbitrary(30, 70))
							]);
						}
						return data;
					}())
				}]
			});
	}

}
