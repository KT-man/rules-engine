import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { DataTableComponent } from './data-table/data-table.component';
import { FormInputComponent } from './form-input/form-input.component';
import { RulesDisplayListComponent } from './rules-display-list/rules-display-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DataTableComponent,
    FormInputComponent,
    RulesDisplayListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'rules-engine';
  tableHeadersData: string[] = [];

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    /** PrimeNg Config */
    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };

    this.primengConfig.ripple = true;

    console.log(this.tableHeadersData);
  }
}
