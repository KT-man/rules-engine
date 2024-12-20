import FilterConditionEnum from './FilterConditionEnum';

/** Interface to store each condition being added for a new rule */
interface ConditionInterface {
  column: string;
  filterCondition: FilterConditionEnum;
  filterValue: number | string;
  logicalOperator: string;
  valueType: 'Date' | 'Text' | 'Number';
}

export default ConditionInterface;
