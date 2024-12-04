import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import {
  OptionDataInterface,
  TableHeaderDataService,
} from '../shared-services/table-header-data.service';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent implements OnInit {
  tableData: Array<Record<string, string | number>>;
  headerLabels: string[];
  titleCaseHeaders: OptionDataInterface[] = [];
  constructor(private service: TableHeaderDataService) {}

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
    const dataRowHeaders = Object.keys(dataRow);

    this.headerLabels = Object.keys(dataRow).map((header) => {
      const spacedStr = header.replace(/([a-z])([A-Z])/g, '$1 $2');

      const titleCaseStr = spacedStr
        .split(' ') // Split the string into words
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ) // Title case each word
        .join(' ');

      return titleCaseStr;
    });

    this.titleCaseHeaders = this.headerLabels.map((label, index) => {
      return { label, value: dataRowHeaders[index] };
    });

    this.service.setTableHeaderData(this.titleCaseHeaders);
  }
}
