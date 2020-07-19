import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DataService, Trade } from '../data.service';
import { Observable, of, Subject } from 'rxjs';
@Component({
	selector: 'app-trades',
	templateUrl: './trades.component.html',
	styleUrls: ['./trades.component.scss']
})
export class TradesComponent {
	@ViewChild('table') table: MatTable<Trade>;
	// displayedColumns = ['position', 'name', 'weight', 'symbol'];
	displayedColumns: string[] = ['type', 'price', 'quantity'];

	constructor(private ds: DataService) { }
	// dataSource = new MatTableDataSource([]);

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
		// this.dataSource.filter = filterValue;
	}


	refresh(trades) {
		let data: Trade[] = [];
		if (this.table.dataSource) {
			data = (this.table.dataSource as Trade[]);
		}
		// data = this.ds.trades;
		this.table.dataSource = trades;
		this.table.renderRows();
	}
	ngOnInit() {
		this.ds.tradesSubject.subscribe((data) => {
			this.refresh(data);
		})
	}
}
