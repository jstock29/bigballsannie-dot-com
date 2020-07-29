import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {LeaderboardDataSource, Person} from './leaderboard-datasource';
import {DataService, GoogleDriveProvider} from '../data.service';


@Component({
    selector: 'app-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements AfterViewInit, OnInit {
    @ViewChild(MatTable) table: MatTable<Person>;
    dataSource: LeaderboardDataSource;
    data: Person[] = [];
    displayedColumns = ['name', 'score', 'date'];

    constructor(private gs: GoogleDriveProvider, private ds: DataService) {
    }

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

    refreshLeaders() {
        const sheetId = '1Qdd629cbbuf4rK7GlGRtWgVuMsXReQmPnsTmBLKg7jk';
        this.gs.getSheetData(sheetId).subscribe(res => {
            res.forEach(r => {
                this.data.push({name: r.user, score: r.score, date: r.date});
            });
            this.dataSource = new LeaderboardDataSource(this.data);
            this.table.dataSource = this.dataSource;
            this.ds.leaders = this.data;
        });
    }

    ngOnInit() {
        this.refreshLeaders();
    }

    ngAfterViewInit() {
        this.table.dataSource = this.dataSource;
    }


}
