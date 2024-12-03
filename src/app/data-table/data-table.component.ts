import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent implements OnInit {
  tableData: Array<Record<string, string | number>>;
  titleCaseHeaders: string[] = [];
  @Input() tableHeadersData: string[] = [];
  @Output() tableHeadersDataChange = new EventEmitter<string[]>();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    /**
     * Mock Data Values
     * Extension would be to fetch from external API or to read from a file
     */
    this.tableData = [
      {
        tradeNumber: '001',
        portfolio: 'Company A Fund',
        counterparty: 'SG Bank',
        price: 1500,
      },
      {
        tradeNumber: '002',
        portfolio: 'Company B Assets',
        counterparty: 'JP Bank6',
        price: 2000,
      },
      {
        tradeNumber: '003',
        portfolio: 'Global Fund',
        counterparty: 'SG Securities',
        price: 1200,
      },
      {
        tradeNumber: '004',
        portfolio: 'International Fund',
        counterparty: 'SG Holdings',
        price: -1500,
      },
      {
        tradeNumber: '005',
        portfolio: 'Company C Equity',
        counterparty: 'FR Bank',
        price: 800,
      },
      {
        tradeNumber: '006',
        portfolio: 'Global Fund',
        counterparty: 'SG Capital',
        price: 1100,
      },
      {
        tradeNumber: '007',
        portfolio: 'Company A Equity',
        counterparty: 'SG Bank',
        price: -2000,
      },
      {
        tradeNumber: '008',
        portfolio: 'Company D Fund',
        counterparty: 'US Bank',
        price: 300,
      },
    ];

    // Retrieve headers from tableData
    const dataRow = this.tableData[0];

    this.titleCaseHeaders = Object.keys(dataRow).map((header) => {
      const spacedStr = header.replace(/([a-z])([A-Z])/g, '$1 $2');

      const titleCaseStr = spacedStr
        .split(' ') // Split the string into words
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ) // Title case each word
        .join(' ');

      return titleCaseStr;
    });
  }
}
