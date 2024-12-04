import { Injectable } from '@angular/core';

export interface OptionDataInterface {
  label: string;
  value: string | number;
}

@Injectable({
  providedIn: 'root',
})
export class TableHeaderDataService {
  private tableHeaderData: OptionDataInterface[] = [];

  getTableHeaderData(): OptionDataInterface[] {
    return this.tableHeaderData;
  }

  setTableHeaderData(newData: OptionDataInterface[]) {
    this.tableHeaderData = newData;
  }
}
