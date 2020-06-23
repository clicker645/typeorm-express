import { AbstractFilter } from "./filter";
import { LookupOptions } from "./lookup.enum";

export class OperationFilter extends AbstractFilter {
  constructor(query: any, prop: string, lookup: string, value: string) {
    super(query, prop, lookup, value);
  }
  buildQuery() {
    switch (this.lookup) {
      case LookupOptions.RELATIONS:
        this.initArrayQuery(LookupOptions.RELATIONS);

        const relationsModel = this.value.split(",");
        this.query[LookupOptions.RELATIONS].push(...relationsModel);
    }
  }

  initArrayQuery(lookup: string) {
    if (this.query[lookup] === null || this.query[lookup] === undefined) {
      this.query[lookup] = [];
    }
  }
}
