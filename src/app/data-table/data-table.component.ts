import { CommonModule, TitleCasePipe } from '@angular/common';
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
import FilterConditionEnum from '../types/FilterConditionEnum';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [TableModule, CommonModule, TitleCasePipe],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
})
export class DataTableComponent implements OnInit {
  /** Initial Table Data to be presented when data is loaded */
  tableData: Array<Record<string, string | number>>;
  headerLabels: string[];
  titleCaseHeaders: OptionDataInterface[] = [];
  currentRules: Array<RulesType>;
  /** Final filteredTableData that is used for rendering */
  filteredTableData: Array<Record<string, string | number>>;

  private rulesSubscription: Subscription;

  constructor(
    private tableHeaderDataService: TableHeaderDataService,
    private rulesStoreService: RulesStoreService
  ) {}

  ngOnInit(): void {
    const titleCasePipe = new TitleCasePipe();
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

      // const titleCaseStr = spacedStr
      //   .split(' ') // Split the string into words
      //   .map(
      //     (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      //   ) // Title case each word
      //   .join(' ');

      const titleCaseStr = spacedStr
        .split(' ')
        .map((word) => titleCasePipe.transform(word))
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
        /** Update local rules when rules service has been updated */
        this.currentRules = rule;
        /** Update table data when rules service has been updated */
        this.filteredTableData = this.applyFilters(
          this.tableData,
          this.currentRules
        );
      });
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
      return rules.every((ruleConditions) => {
        // For each rule set (joined by AND/OR)
        const ruleResult = ruleConditions.reduce((acc, condition, index) => {
          const {
            column,
            filterCondition,
            filterValue,
            logicalOperator,
            valueType,
          } = condition;

          // Get the value from the data object based on the column
          const columnValue = data[column];

          let conditionMet = false;

          /**
           * @todo Update handling to account for mismatched types i.e. Beginning with... Number Type should not work
           * Compare based on FilterConditionEnum
           * */
          switch (filterCondition) {
            /** @todo Further clarification on whether these filters not be applied to strings */
            case FilterConditionEnum.GREATER_THAN:
              conditionMet = columnValue > filterValue;
              break;
            /** @todo Further clarification on whether these filters not be applied to strings */
            case FilterConditionEnum.GREATER_THAN_OR_EQUAL_TO:
              conditionMet = columnValue >= filterValue;
              break;
            /** @todo Further clarification on whether these filters not be applied to strings */
            case FilterConditionEnum.LESS_THAN:
              conditionMet = columnValue < filterValue;
              break;
            /** @todo Further clarification on whether these filters not be applied to strings */
            case FilterConditionEnum.LESS_THAN_OR_EQUAL_TO:
              conditionMet = columnValue <= filterValue;
              break;
            /** @todo Further clarification on whether these filters should be case-sensitive */
            case FilterConditionEnum.CONTAINS:
              if (valueType === 'Text' && typeof columnValue === 'string') {
                conditionMet = columnValue.includes(
                  (filterValue as string).trim()
                );
              }
              break;
            /** @todo Further clarification on whether these filters should be case-sensitive */
            case FilterConditionEnum.NOT_CONTAINS:
              if (valueType === 'Text' && typeof columnValue === 'string') {
                conditionMet = !columnValue.includes(
                  (filterValue as string).trim()
                );
              }
              break;
            /** @todo Further clarification on whether these filters should be case-sensitive */
            case FilterConditionEnum.BEGIN_WITH:
              if (valueType === 'Text' && typeof columnValue === 'string') {
                conditionMet = columnValue.startsWith(filterValue as string);
              }
              break;
            /** @todo Further clarification on whether these filters should be case-sensitive */
            case FilterConditionEnum.END_WITH:
              if (valueType === 'Text' && typeof columnValue === 'string') {
                conditionMet = columnValue.endsWith(filterValue as string);
              }
              break;
            case FilterConditionEnum.EQUAL_TO:
              conditionMet = columnValue === filterValue;
              break;
            case FilterConditionEnum.NOT_EQUAL_TO:
              conditionMet = columnValue !== filterValue;
              break;
            default:
              conditionMet = false;
          }

          /**
           * Apply logical operator to combine conditions
           * */
          if (index === 0) {
            return conditionMet;
          }

          // Apply logical operator between conditions
          if (logicalOperator === 'AND') {
            return acc && conditionMet; // AND means all conditions must be true
          }
          if (logicalOperator === 'OR') {
            return acc || conditionMet; // OR means at least one condition must be true
          }

          return acc;
        }, true);

        return ruleResult; // Only include data if all conditions are met
      });
    });

    return [...filteredTableData];
  }
}
