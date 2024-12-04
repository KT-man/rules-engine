import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import {
  RulesStoreService,
  RulesType,
} from '../shared-services/rules-store.service';
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
  currentRules: Array<RulesType>;

  private rulesSubscription: Subscription;

  constructor(
    private tableHeaderDataService: TableHeaderDataService,
    private rulesStoreService: RulesStoreService
  ) {}

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

    /** Retrieve headers from tableData and initialize tableHeaderDataService */
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

    this.tableHeaderDataService.setTableHeaderData(this.titleCaseHeaders);
    /** END - Retrieve headers from tableData and initialize tableHeaderDataService */

    /** Retrieve current rules list from rules service and apply filters */
    this.rulesSubscription = this.rulesStoreService
      .getObservableRulesStore()
      .subscribe((rule) => {
        this.currentRules = rule;
        this.applyFilters(this.tableData, this.currentRules);
      });

    this.applyFilters(this.tableData, this.currentRules);
  }

  ngOnDestroy(): void {
    if (this.rulesSubscription) {
      this.rulesSubscription.unsubscribe();
    }
  }

  /**
   * @todo Filtering logic should be abstracted out of component
   * applyFilters takes in tableData and currentRules to return filteredTableData
   * */
  applyFilters(
    tableData: Array<Record<string, string | number>>,
    rules: Array<RulesType>
  ): Array<Record<string, string | number>> {
    if (rules.length === 0) {
      return tableData;
    }

    const filteredTableData = tableData.filter((data) => {
      return data;
    });

    return filteredTableData;
  }
}
