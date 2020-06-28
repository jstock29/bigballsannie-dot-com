import { Component, OnInit } from '@angular/core';
var Highcharts = require('highcharts/highstock');

@Component({
	selector: 'app-stocks',
	templateUrl: './stocks.component.html',
	styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
	money = 100.00;
	trades = [];
	current_price = 0;

	constructor() { }

	trade(type: string) {
		if (type === 'buy') {

		} else {

		}
	}

	ngOnInit(): void {
		let momentum = 1.0;
		let count = 0

		// Create the chart
		Highcharts.stockChart('container', {

			chart: {
				events: {
					load: function() {
						// set up the updating of the chart each second
						var series = this.series[0];
						console.log(series.yData[0])
						this.current_price = series.yData[0]

						setInterval(function() {
							var time = (new Date()).getTime(), // current time
								price = this.current_price + (Math.round((Math.random() - 1) * 100) * momentum);
							series.addPoint([time, price], true, true);
							this.current_price = price
						}, 1000);
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
							Math.round(Math.random() * 100)
						]);
					}
					return data;
				}())
			}]
		});
	}

}
