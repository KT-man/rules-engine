/** FilterConditionInterface for FilterCondition input field  */
enum FilterConditionEnum {
  GREATER_THAN = 1,
  GREATER_THAN_OR_EQUAL_TO = 2,
  LESS_THAN = 3,
  LESS_THAN_OR_EQUAL_TO = 4,
  CONTAINS = 5,
  NOT_CONTAINS = 6,
  BEGIN_WITH = 7,
  END_WITH = 8,
  EQUAL_TO = 9,
  NOT_EQUAL_TO = 10,
}

export default FilterConditionEnum;
