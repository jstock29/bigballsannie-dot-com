import { Injectable } from '@angular/core';

export interface Trade {
	type: string;
	quantity: number;
	price: number;
}

@Injectable({
	providedIn: 'root'
})
export class DataService {
	trades: Trade[];
	constructor() {
		this.trades = [];
	}
}
