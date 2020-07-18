import {
	Component, OnInit, AfterViewInit, ComponentFactory, NgModule, Compiler, ViewChild,
	ViewContainerRef, ComponentRef, ComponentFactoryResolver
} from '@angular/core';
import { map } from 'rxjs/operators';
import { BrowserModule } from "@angular/platform-browser";
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { StocksComponent } from '../stocks/stocks.component'
import { BulletinComponent } from '../bulletin/bulletin.component'
import { TradesComponent } from '../trades/trades.component'
import { LeaderboardComponent } from '../leaderboard/leaderboard.component'

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	/** Based on the screen size, switch from standard to one column per row */
	// cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
	// 	map(({ matches }) => {
	// 		if (matches) {
	// 			return [
	// 				{ title: null, cols: 2, rows: 2, card_id: 'container1', component: BulletinComponent },
	// 				{ title: null, cols: 2, rows: 2, card_id: 'container2', component: StocksComponent },
	// 				{ title: 'Trades', cols: 2, rows: 1, card_id: 'container3', component: TradesComponent },
	// 				{ title: 'Leaderboard', cols: 2, rows: 1, card_id: 'container4', component: LeaderboardComponent }
	// 			];
	// 		}
	//
	// 		return [
	// 			{ title: null, cols: 2, rows: 2, card_id: 'container1', component: BulletinComponent },
	// 			{ title: null, cols: 1, rows: 2, card_id: 'container2', component: StocksComponent },
	// 			{ title: 'Trades', cols: 1, rows: 1, card_id: 'container3', component: TradesComponent },
	// 			{ title: 'Leaderboard', cols: 1, rows: 1, card_id: 'container4', component: LeaderboardComponent }
	// 		];
	// 	})
	// );
	// @ViewChild('dynamicInsert1', { read: ViewContainerRef }) dynamicInsert1: ViewContainerRef;
	// @ViewChild('dynamicInsert2', { read: ViewContainerRef }) dynamicInsert2: ViewContainerRef;
	// @ViewChild('dynamicInsert3', { read: ViewContainerRef }) dynamicInsert3: ViewContainerRef;
	// @ViewChild('dynamicInsert4', { read: ViewContainerRef }) dynamicInsert4: ViewContainerRef;


	constructor(private breakpointObserver: BreakpointObserver) {
	}

	ngOnInit() {
		// setTimeout(() => {
		// 	setTimeout(() => {
		// 		const subscription = this.cards.subscribe(cards => {
		// 			cards.forEach(card => {
		// 				switch (card.card_id) {
		// 					case 'container1':
		// 						console.log(card.component)
		// 						const componentFactory1 = this.componentFactoryResolver1.resolveComponentFactory(card.component);
		// 						this.dynamicInsert1.clear();
		// 						this.dynamicInsert1.createComponent(componentFactory1);
		// 						break;
		// 					case 'container2':
		// 						console.log(card.component)
		//
		// 						const componentFactory2 = this.componentFactoryResolver2.resolveComponentFactory(card.component);
		// 						this.dynamicInsert2.clear();
		// 						this.dynamicInsert2.createComponent(componentFactory2);
		// 						break;
		// 					case 'container3':
		// 						console.log(card.component)
		//
		// 						const componentFactory3 = this.componentFactoryResolver3.resolveComponentFactory(card.component);
		// 						this.dynamicInsert3.clear();
		// 						this.dynamicInsert4.createComponent(componentFactory3);
		// 						break;
		// 					case 'container4':
		// 						console.log(card.component)
		//
		// 						const componentFactory4 = this.componentFactoryResolver4.resolveComponentFactory(card.component);
		// 						this.dynamicInsert4.clear();
		// 						this.dynamicInsert4.createComponent(componentFactory4);
		// 						break;
		// 				}
		// 			})
		// 		})
		//
		// 	})
		// })

	}
	ngAfterViewInit() {
	}
}
