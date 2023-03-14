import {
  Any,
  ArrayContainedBy,
  ArrayContains,
  ArrayOverlap,
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

const operatorsMap = {
  eq: Equal,
  not: Not,
  lt: LessThan,
  lte: LessThanOrEqual,
  gt: MoreThan,
  gte: MoreThanOrEqual,
  like: Like,
  i_like: ILike,
  between: Between,
  in: In,
  any: Any,
  is_null: IsNull,
  array_contains: ArrayContains,
  array_contained_by: ArrayContainedBy,
  array_overlap: ArrayOverlap,
};

const operators = Object.keys(operatorsMap);

export const transformFilter = (object: Record<string, any>) => {
  const properties = Object.keys(object);

  // We reach the value that is being compared
  if (typeof object !== 'object') {
    //! Apply escape logic
    return object;
  }

  // object has shape { [operatorKey]: value }
  if (properties.length === 1 && operators.includes(properties[0])) {
    const key = properties[0];
    const filter = transformFilter(object[key]);

    // The filter has been transformed from an object of shape { [operatorKey]: value }
    // And now has shape { _operator: value, _value: value }
    if (typeof filter === 'object') {
      return { _operator: operatorsMap[key], _value: filter._operator(filter._value) };
    }
    // The filter is the value that is being compared
    else {
      return { _operator: operatorsMap[key], _value: filter };
    }
  }

  for (const key of properties) {
    const filter = transformFilter(object[key]);

    // The filter has been transformed from an object of shape { [operatorKey]: value }
    // And now has shape { _operator: value, _value: value }
    if (typeof filter === 'object' && '_operator' in filter) {
      object[key] = filter._operator(filter._value);
    }
  }
};
