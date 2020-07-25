import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, EntryDialog } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StocksComponent } from './stocks/stocks.component';
import { BulletinComponent } from './bulletin/bulletin.component';
import { TradesComponent } from './trades/trades.component';
import { TradesDataSource } from './trades/trades-datasource';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@NgModule({
	declarations: [
		AppComponent,
		EntryDialog,
		DashboardComponent,
		StocksComponent,
		BulletinComponent,
		TradesComponent,
		LeaderboardComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		FlexLayoutModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatGridListModule,
		MatCardModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		MatDialogModule,
		MatFormFieldModule,
		MatProgressSpinnerModule,
		MatInputModule,
		LayoutModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		DragDropModule
	],
	entryComponents: [StocksComponent, BulletinComponent, TradesComponent, LeaderboardComponent, EntryDialog],
	providers: [TradesDataSource, TradesComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }
