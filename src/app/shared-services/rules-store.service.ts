import { Injectable } from '@angular/core';
import ConditionInterface from '../types/ConditionInterface';

export type RulesType = Array<ConditionInterface>;

@Injectable({
  providedIn: 'root',
})
export class RulesStoreService {
  /**
   * Each Rule is an array of conditions
   * Rule Store is an array of rules
   */
  private rulesStore: Array<RulesType> = [];

  getRulesStore() {
    return this.rulesStore;
  }

  setRulesStore(newRule: RulesType) {
    /** Add the newest rule as the last element of array */
    this.rulesStore.push(newRule);
    console.log(this.rulesStore);
  }
}
