import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RulesStoreService } from '../shared-services/rules-store.service';
import {
  OptionDataInterface,
  TableHeaderDataService,
} from '../shared-services/table-header-data.service';
import ConditionInterface from '../types/ConditionInterface';
import FilterConditionEnum from '../types/FilterConditionEnum';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
  ],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.css',
})
export class FormInputComponent implements OnInit {
  constructor(
    private tableHeaderDataService: TableHeaderDataService,
    private rulesStoreService: RulesStoreService
  ) {}

  FilterConditionEnum = FilterConditionEnum;

  /** Options for dropdown fields */
  columnOptionData: OptionDataInterface[] = [{ label: '', value: '' }];
  valueTypeOptionData: string[] = ['Text', 'Number'];
  filterConditionOptionData: OptionDataInterface[] = [{ label: '', value: '' }];
  logicalOperatorOptionData: OptionDataInterface[] = [{ label: '', value: '' }];
  /** Form related variables */
  rulesForm: FormGroup;
  confirmRuleHandler: () => void;
  addConditionHandler: () => void;
  /** Condition related variables */
  currentConditions: Array<ConditionInterface> = [];

  ngOnInit(): void {
    /** Initialize Rules Form */
    this.rulesForm = new FormGroup({
      column: new FormControl(null),
      valueType: new FormControl(null),
      filterValue: new FormControl(null),
      filterCondition: new FormControl(null),
      logicalOperator: new FormControl(null),
    });
    /** End Initialize Rules Form */

    /** Button Click Handlers */
    this.addConditionHandler = () => {
      /** Push new condition to existing rule */
      const formValue = this.rulesForm.value;
      this.currentConditions.push(formValue);

      /** @todo Add validation here to check the conditions being submitted */
      this.rulesForm.reset();
    };

    this.confirmRuleHandler = () => {
      /** Push new rule to rule-store-service */
      this.rulesStoreService.addToRulesStore(this.currentConditions);

      /** Clear out all currentConditions */
      this.currentConditions = [];
    };
    /** End Button Click Handlers */

    /** OptionData values */
    // Retrieve optionData for columnOptionData from tableHeaderDataService
    this.columnOptionData = this.tableHeaderDataService.getTableHeaderData();
    this.filterConditionOptionData = [
      { label: 'Greater Than', value: FilterConditionEnum.GREATER_THAN },
      {
        label: 'Greater Than or Equal To',
        value: FilterConditionEnum.GREATER_THAN_OR_EQUAL_TO,
      },
      { label: 'Less Than', value: FilterConditionEnum.LESS_THAN },
      {
        label: 'Less Than or Equal To',
        value: FilterConditionEnum.LESS_THAN_OR_EQUAL_TO,
      },
      { label: 'Containing', value: FilterConditionEnum.CONTAINS },
      { label: 'Not Containing', value: FilterConditionEnum.NOT_CONTAINS },
      { label: 'Beginning With', value: FilterConditionEnum.BEGIN_WITH },
      { label: 'Ending With', value: FilterConditionEnum.END_WITH },
      { label: 'Equal To', value: FilterConditionEnum.EQUAL_TO },
      { label: 'Not Equal To', value: FilterConditionEnum.NOT_EQUAL_TO },
    ];
    this.logicalOperatorOptionData = [
      { label: 'AND', value: 'AND' },
      { label: 'OR', value: 'OR' },
    ];
  }
}
