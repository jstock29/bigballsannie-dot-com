import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { LeaderboardDataSource, LeaderboardItem } from './leaderboard-datasource';

@Component({
	selector: 'app-leaderboard',
	templateUrl: './leaderboard.component.html',
	styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements AfterViewInit, OnInit {
	@ViewChild(MatTable) table: MatTable<LeaderboardItem>;
	dataSource: LeaderboardDataSource;
	key = 'AIzaSyCVSE2tCt9j0-Fj_Gjj9zZmbqXFCy76rwY'
	url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTfPhUS9DCIKZ5-6aMwroCc-_sMoCZGDiZjhQXKQYPydac152FTftnmK6j1uwnbZEbDCcpzeC5MMnWG/pubhtml'

	/** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
	displayedColumns = ['id', 'name'];

	ngOnInit() {
		this.dataSource = new LeaderboardDataSource();
	}

	ngAfterViewInit() {
		this.table.dataSource = this.dataSource;
	}
}
