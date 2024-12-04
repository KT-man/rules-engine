import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs';
import {
  RulesStoreService,
  RulesType,
} from '../shared-services/rules-store.service';
import FilterConditionEnum from '../types/FilterConditionEnum';

@Component({
  selector: 'app-rules-display-list',
  standalone: true,
  imports: [CardModule, CommonModule, ButtonModule],
  templateUrl: './rules-display-list.component.html',
  styleUrl: './rules-display-list.component.css',
})
export class RulesDisplayListComponent implements OnInit {
  private rulesSubscription: Subscription;

  constructor(private rulesStoreService: RulesStoreService) {}

  currentRules: Array<RulesType>;
  FilterConditionEnum = FilterConditionEnum;
  saveRules: () => void;
  revertRules: () => void;
  removeAllRules: () => void;

  ngOnInit() {
    /** Retrieve current rules list from rules service and apply filters */
    this.rulesSubscription = this.rulesStoreService
      .getObservableRulesStore()
      .subscribe((rule) => {
        /** Update local rules when rules service has been updated */
        this.currentRules = rule;
        console.log(rule);
      });

    /** Retrieve from localStorage if any */
    const savedRules = window.localStorage.getItem('rules');
    const parsedRules =
      typeof savedRules === 'string' ? JSON.parse(savedRules) : [];

    this.currentRules =
      parsedRules.length > 0
        ? parsedRules
        : this.rulesStoreService.getRulesStore();

    this.saveRules = () => {
      window.localStorage.setItem('rules', JSON.stringify(this.currentRules));
    };

    this.removeAllRules = () => {
      /** Remove from storage */
      window.localStorage.clear();
      /** Remove from service */
      this.rulesStoreService.clearRulesStore();
    };
  }

  ngOnDestroy(): void {
    if (this.rulesSubscription) {
      this.rulesSubscription.unsubscribe();
    }
  }
}
