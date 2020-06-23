import { LookupDelimiter, LookupFilter } from "./lookup.enum";
import { FieldFilter } from "./field-filter";
import { AbstractFilter } from "./filter";
import { OperationFilter } from "./operation-filter";

export class FilterFactory {
  public get(query: any, key: string, value: string): AbstractFilter {
    let filter: AbstractFilter;
    key.includes(LookupDelimiter.LOOKUP_DELIMITER)
      ? (filter = this.FieldFilter(query, key, value))
      : (filter = this.OptionFilter(query, key, value));

    return filter;
  }

  FieldFilter(query: any, key: string, value: string): FieldFilter {
    const field = key.split(LookupDelimiter.LOOKUP_DELIMITER)[0];
    const notQuery = key.includes(
      `${LookupDelimiter.LOOKUP_DELIMITER}${LookupFilter.NOT}`
    );

    const lookup = key.includes(LookupDelimiter.LOOKUP_DELIMITER)
      ? (key.split(LookupDelimiter.LOOKUP_DELIMITER)[
          notQuery ? 2 : 1
        ] as LookupFilter)
      : LookupFilter.EXACT;

    return new FieldFilter(query, field, lookup, value, notQuery);
  }

  OptionFilter(query: any, key: string, value: string): OperationFilter {
    return new OperationFilter(query, "", key, value);
  }
}
