import {Component} from '@angular/core';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    /** Based on the screen size, switch from standard to one column per row */

    constructor(private breakpointObserver: BreakpointObserver) {
    }
}
