import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TradesDataSource, Trade } from './trades-datasource';


@Component({
	selector: 'app-trades',
	templateUrl: './trades.component.html',
	styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements AfterViewInit, OnInit {
	@ViewChild(MatTable) table: MatTable<Trade>;
	dataSource: TradesDataSource;

	constructor() {

	}

	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['type', 'quantity', 'price'];

	ngOnInit() {
		this.dataSource = new TradesDataSource();
		this.dataSource.connect();
	}

	ngAfterViewInit() {

		this.table.dataSource = this.dataSource;
	}
}
