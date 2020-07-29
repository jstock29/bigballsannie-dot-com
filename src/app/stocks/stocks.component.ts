import {Component, OnInit} from '@angular/core';
import {DataService, Trade} from '../data.service';
import theme from 'highcharts/themes/sunset';

const Highcharts = require('highcharts/highstock');
theme(Highcharts);

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

    constructor(private ds: DataService) {
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
        // this.ds.leaders.forEach((leader) => {
        //     console.log(leader);
        //     if (this.ds.money > leader.score) {
        //         console.log('NEW HIGH SCORE');
        //     } else {
        //         console.log('LOSER');
        //     }
        // });
    }

    startGame() {
        // this.renderChart();
        setTimeout(null, 1000);
        this.playing = true;
        this.minutes = .25;
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
    }

    trade(type) {
        let trade: Trade = {type: '', quantity: null, price: null};
        if (type === 'buy') {
            if (this.ds.money < this.currentPrice) {
                console.log('NOT ENOUGH MONEY');
            } else {
                this.ds.turnips = Math.floor(this.ds.money / this.currentPrice);
                trade = {type: 'buy', quantity: this.ds.turnips, price: this.currentPrice};
                this.ds.money = this.ds.money - (this.ds.turnips * this.currentPrice);
                console.log('bought ', this.ds.turnips, ' turnips at ', this.currentPrice, 'per beet');
            }
        } else if (type === 'sell') {
            if (this.ds.turnips === 0) {
                console.log('NO TURNIPS TO SELL');
            } else {
                const saleValue = this.ds.turnips * this.currentPrice;
                console.log('sold for $', saleValue);
                trade = {type: 'sell', quantity: this.ds.turnips, price: this.currentPrice};
                this.ds.money = this.ds.money + saleValue;
                this.ds.turnips = 0;
            }
        }
        this.ds.addRow(trade);
    }

    renderChart() {
        const that = this;
        this.currentPrice = 0;

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        //todo: remove old chart bfore reloading a new one

        const momentum = 1.0;
        const count = 0;

        // Create the chart
        Highcharts.stockChart('container',
            {
                chart: {
                    events: {
                        load() {
                            // set up the updating of the chart each second
                            const series = this.series[0];
                            this.current_price = series.yData[0];
                            console.log('Starting Price:', this.current_price);
                            let price = this.current_price;

                            setInterval(() => {
                                const time = (new Date()).getTime(); // current time
                                const change = (Math.round(getRandomArbitrary(-20, 20)) * momentum);
                                price = price + (Math.round(getRandomArbitrary(-20, 20)) * momentum);
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
                title: {
                    text: 'The Stonk Market'
                },
                exporting: {
                    enabled: false
                },
                series: [
                    {
                        name: 'Stonk Price',
                        data: (function () {
                            // generate an array of random data
                            let data = [];
                            const time = (new Date()).getTime();
                            let i;
                            // Initialize past data
                            for (i = -60; i <= 0; i += 1) {
                                data.push([
                                    time + i * 1000,
                                    Math.round(getRandomArbitrary(30, 70))
                                ]);
                            }
                            return data;
                        }())
                    }
                ]
            });
    }

    ngOnInit(): void {
        this.renderChart();
    }
}
