import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import {
  RulesStoreService,
  RulesType,
} from '../shared-services/rules-store.service';
import FilterConditionEnum from '../types/FilterConditionEnum';

@Component({
  selector: 'app-rules-display-list',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './rules-display-list.component.html',
  styleUrl: './rules-display-list.component.css',
})
export class RulesDisplayListComponent implements OnInit {
  constructor(private rulesService: RulesStoreService) {}

  currentRules: Array<RulesType>;
  FilterConditionEnum = FilterConditionEnum;

  ngOnInit() {
    // this.rulesService.getObservableRulesStore().subscribe((rule) => {
    //   this.currentRules = rule;
    // });
    this.currentRules = this.rulesService.getRulesStore();
  }
}
