import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { LeaderboardDataSource, LeaderboardItem } from './leaderboard-datasource';

@Component({
	selector: 'app-leaderboard',
	templateUrl: './leaderboard.component.html',
	styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements AfterViewInit, OnInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatTable) table: MatTable<LeaderboardItem>;
	dataSource: LeaderboardDataSource;

	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['id', 'name'];

	ngOnInit() {
		this.dataSource = new LeaderboardDataSource();
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
		this.table.dataSource = this.dataSource;
	}
}
