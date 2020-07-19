import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

export interface Trade {
	type: string;
	quantity: number;
	price: number;
}

@Injectable({
	providedIn: 'root'
})
export class DataService {
	trades: Trade[] = [];
	time: number = 120;
	price: number;
	tradesSubject: Subject<any> = new Subject<any>();


	constructor() { }

	addRow(new_row: Trade): Observable<Trade[]> {
		this.trades.unshift(new_row)
		this.tradesSubject.next(this.trades);

		return of(this.trades)
	}

	reset() {
		this.trades = [];
		this.time = 120;
	}
}
