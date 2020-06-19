import { FilterFactory } from "./filter-factory";

export const ITEMS_PER_PAGE = 25;

export class ExpressQueryBuilder {
  private readonly expressQuery: any;
  private readonly typeORMQuery: any;
  private readonly withPagination: boolean;

  constructor(expressQuery: any, withPagination: boolean = false) {
    this.expressQuery = expressQuery;
    this.withPagination = withPagination;
    this.typeORMQuery = {};
  }

  public build(): any {
    const factory = new FilterFactory();

    if (this.withPagination) {
      if (
        this.expressQuery["pagination"] === undefined ||
        this.expressQuery["pagination"] === true
      ) {
        this.setPage();
        this.setLimit();
      }
    }

    this.clearPagination();
    this.setOrder();

    for (const queryItem in this.expressQuery) {
      const filter = factory.get(
        this.typeORMQuery,
        queryItem,
        this.expressQuery[queryItem]
      );
      filter.buildQuery();
    }

    return this.typeORMQuery;
  }

  private setPage() {
    this.typeORMQuery["skip"] =
      this.expressQuery["page"] && this.expressQuery["page"] > 1
        ? (this.expressQuery["page"] - 1) *
          (this.expressQuery["limit"] || ITEMS_PER_PAGE)
        : 0;
    delete this.expressQuery["page"];
  }

  private setLimit() {
    this.typeORMQuery["take"] =
      this.expressQuery["limit"] && this.expressQuery["limit"] > 0
        ? this.expressQuery["limit"]
        : ITEMS_PER_PAGE;
    delete this.expressQuery["limit"];
  }

  private clearPagination() {
    delete this.expressQuery["limit"];
    delete this.expressQuery["page"];
    delete this.expressQuery["pagination"];
  }

  private setOrder() {
    if (!this.expressQuery["order"]) {
      return;
    }
    const orderFields = this.expressQuery["order"].split(",");
    for (const field of orderFields) {
      const orderCriteria = this.getOrderCriteria(field);
      this.typeORMQuery["order"] = {
        ...this.typeORMQuery["order"],
        [field.substr(1, field.length)]: orderCriteria,
      };
    }
    delete this.expressQuery["order"];
  }

  private getOrderCriteria(field: string): string {
    if (field.startsWith("+")) {
      return "ASC";
    } else if (field.startsWith("-")) {
      return "DESC";
    } else {
      throw new Error(
        `No order set for <${field}>. Prefix with one of these: [+, -]`
      );
    }
  }
}
