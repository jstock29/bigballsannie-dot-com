import {
	Component, OnInit, AfterViewInit, ComponentFactory, NgModule, Compiler, ViewChild,
	ViewContainerRef, ComponentRef, ComponentFactoryResolver
} from '@angular/core';
import { map } from 'rxjs/operators';
import { BrowserModule } from "@angular/platform-browser";

import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { StocksComponent } from '../stocks/stocks.component'
import { BulletinComponent } from '../bulletin/bulletin.component'

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	/** Based on the screen size, switch from standard to one column per row */
	cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
		map(({ matches }) => {
			if (matches) {
				return [
					{ title: 'Stonks 📈', cols: 2, rows: 2, card_id: 'container1', component: StocksComponent },
					{ title: 'Card 2', cols: 1, rows: 1, card_id: 'container2', component: BulletinComponent },
					{ title: 'Card 3', cols: 1, rows: 1, card_id: 'container3', component: BulletinComponent },
					{ title: 'Card 4', cols: 1, rows: 1, card_id: 'container4', component: BulletinComponent }
				];
			}

			return [
				{ title: 'Stonks', cols: 2, rows: 2, card_id: 'container1', component: StocksComponent },
				{ title: 'Card 2', cols: 1, rows: 1, card_id: 'container2', component: BulletinComponent },
				{ title: 'Card 3', cols: 1, rows: 2, card_id: 'container3', component: BulletinComponent },
				{ title: 'Card 4', cols: 1, rows: 1, card_id: 'container4', component: BulletinComponent }
			];
		})
	);

	@ViewChild('dynamicInsert1', { read: ViewContainerRef }) dynamicInsert1: ViewContainerRef;
	@ViewChild('dynamicInsert2', { read: ViewContainerRef }) dynamicInsert2: ViewContainerRef;
	@ViewChild('dynamicInsert3', { read: ViewContainerRef }) dynamicInsert3: ViewContainerRef;
	@ViewChild('dynamicInsert4', { read: ViewContainerRef }) dynamicInsert4: ViewContainerRef;

	constructor(private breakpointObserver: BreakpointObserver, private componentFactoryResolver: ComponentFactoryResolver) {

	}
	ngAfterViewInit() {
		const subscription = this.cards.subscribe(cards => {
			cards.forEach(card => {
				const componentFactory = this.componentFactoryResolver.resolveComponentFactory(card.component);
				if (card.card_id === 'container1') {
					this.dynamicInsert1.clear();
					this.dynamicInsert1.createComponent(componentFactory);
				} else if (card.card_id === 'container2') {
					this.dynamicInsert2.clear();
					this.dynamicInsert2.createComponent(componentFactory);
				} else if (card.card_id === 'container3') {
					this.dynamicInsert3.clear();
					this.dynamicInsert3.createComponent(componentFactory);
				} else if (card.card_id === 'container4') {
					this.dynamicInsert4.clear();
					this.dynamicInsert4.createComponent(componentFactory);
				}

			})
		})
	}
}
