import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

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
	money: number = 100;
	turnips: number = 0;
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
		this.tradesSubject.next(this.trades);
		this.time = 120;
		this.money = 100;
		this.turnips = 0;
	}
}


@Injectable({
	providedIn: 'root'
})
export class GoogleDriveProvider {
	data: any = null;

	constructor(public http: HttpClient) { }

	public getSheetData(sheetId): Observable<any> {
		const url = `https://spreadsheets.google.com/feeds/list/${sheetId}/od6/public/values?alt=json`;
		return this.http.get(url)
			.pipe(
				map((res: any) => {
					const data = res.feed.entry;

					const returnArray: Array<any> = [];
					if (data && data.length > 0) {
						data.forEach(entry => {
							const obj = {};
							for (const x in entry) {
								if (x.includes('gsx$') && entry[x].$t) {
									obj[x.split('$')[1]] = entry[x]['$t'];
								}
							}
							returnArray.push(obj);
						});
					}
					return returnArray;
				})
			);
	}
}
