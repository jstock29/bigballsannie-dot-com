import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface Person {
	name: string;
	score: number;
	date: string;
}

/**
 * Data source for the Personboard view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class LeaderboardDataSource extends DataSource<Person> {
	data: Person[] = [];

	constructor(d) {
		super();
		this.data = d;
	}

	/**
	 * Connect this data source to the table. The table will only update when
	 * the returned stream emits new items.
	 * @returns A stream of the items to be rendered.
	 */
	connect(): Observable<Person[]> {
		// Combine everything that affects the rendered data into one update
		// stream for the data-table to consume.
		const dataMutations = [
			observableOf(this.data)
		];

		return merge(...dataMutations).pipe(map(() => {
			return [...this.data];
		}));
	}

	/**
	 *  Called when the table is being destroyed. Use this function, to clean up
	 * any open connections or free any held resources that were set up during connect.
	 */
	disconnect() { }

	/**
	 * Paginate the data (client-side). If you're using server-side pagination,
	 * this would be replaced by requesting the appropriate data from the server.
	 */

	/**
	 * Sort the data (client-side). If you're using server-side sorting,
	 * this would be replaced by requesting the appropriate data from the server.
	 */
	// private getSortedData(data: PersonboardItem[]) {
	// 	if (!this.sort.active || this.sort.direction === '') {
	// 		return data;
	// 	}
	//
	// 	return data.sort((a, b) => {
	// 		const isAsc = this.sort.direction === 'asc';
	// 		switch (this.sort.active) {
	// 			case 'name': return compare(a.name, b.name, isAsc);
	// 			case 'id': return compare(+a.id, +b.id, isAsc);
	// 			default: return 0;
	// 		}
	// 	});
	// }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
	return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
