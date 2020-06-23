export abstract class AbstractFilter {
  public readonly prop: string;
  public readonly lookup: string;
  public readonly value: string;
  public query: any;

  protected constructor(
    query: any,
    prop: string,
    lookup: string,
    value: string
  ) {
    this.query = query;
    this.prop = prop;
    this.lookup = lookup;
    this.value = value;
  }

  public abstract buildQuery();
}
