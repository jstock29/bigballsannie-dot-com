import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { StocksComponent } from './stocks/stocks.component';
import { BulletinComponent } from './bulletin/bulletin.component';
import { TradesComponent } from './trades/trades.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@NgModule({
	declarations: [
		AppComponent,
		DashboardComponent,
		StocksComponent,
		BulletinComponent,
		TradesComponent,
		LeaderboardComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatGridListModule,
		MatCardModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		LayoutModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule
	],
	entryComponents: [StocksComponent, BulletinComponent],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
