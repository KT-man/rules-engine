import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import ConditionInterface from '../types/ConditionInterface';

export type RulesType = Array<ConditionInterface>;

export interface RulesInterface {
  rules: RulesType;
}

@Injectable({
  providedIn: 'root',
})
export class RulesStoreService {
  constructor() {}

  // Private variable to store rules
  private rulesStore: Array<RulesType> = [];

  private rulesStoreSubject: BehaviorSubject<Array<RulesType>> =
    new BehaviorSubject<Array<RulesType>>(this.rulesStore);

  // Getter for the rules (returns an observable of the rules)
  getRulesStore() {
    return this.rulesStore;
  }

  // Setter for rulesStore, adds a new rule and emits the updated value
  setRulesStore(newRule: RulesType) {
    this.rulesStore.push(newRule); // Add the new rule to the array
    this.rulesStoreSubject.next(this.rulesStore); // Emit the updated value
  }

  // Getter for the observable of the rulesStore
  getObservableRulesStore() {
    return this.rulesStoreSubject.asObservable();
  }

  /** Method to remove all rules in rulesStore */
  clearRulesStore() {
    this.rulesStore = [];
    this.rulesStoreSubject.next(this.rulesStore); // Emit the updated value
  }
}
