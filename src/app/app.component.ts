import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
export class AppComponent {
  title = 'rules-engine';
}
