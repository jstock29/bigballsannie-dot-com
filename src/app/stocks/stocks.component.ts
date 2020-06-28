import { Component, OnInit } from '@angular/core';
var Highcharts = require('highcharts/highstock');

@Component({
	selector: 'app-stocks',
	templateUrl: './stocks.component.html',
	styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
	money: number;
	beets: number;
	trades = [];
	current_price: number;

	constructor() { }

	updatePrice(price) {
		this.current_price = price;
	}

	trade(type) {
		if (type === 'buy') {
			if (this.money < this.current_price) {
				console.log('NOT ENOUGH MONEY')
			} else {
				this.beets = Math.floor(this.money / this.current_price)
				this.money = this.money - (this.beets * this.current_price)
				console.log('bought ', this.beets, ' beets at ', this.current_price, 'per beet')
			}
		} else if (type === 'sell') {
			if (this.beets === 0) {
				console.log('NO BEETS TO SELL')
			} else {
				const sale_value = this.beets * this.current_price
				console.log('sold for $', sale_value)

				this.money = this.money + sale_value
				this.beets = 0
			}
		}
	}

	ngOnInit(): void {
		const that = this;
		this.money = 100.00
		this.beets = 0
		function getRandomArbitrary(min, max) {
			return Math.random() * (max - min) + min;
		}

		let momentum = 1.0;
		let count = 0

		// Create the chart
		Highcharts.stockChart('container', {

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
							if (price < 0) {
								price = 0
							}
							series.addPoint([time, price], true, true);
							that.updatePrice(price)
						}, Math.round(getRandomArbitrary(500, 1250)));
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
