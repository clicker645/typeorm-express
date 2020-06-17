export class PaginationResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number | undefined;
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | undefined;
  nextPage: number | undefined;

  factory(limit: number, page: number, totalDocs: number) {
    this.limit = +limit;
    this.totalDocs = +totalDocs;
    page != null ? (this.page = +page) : (this.page = 1);

    this.limit === undefined || this.limit === 0
      ? (this.totalPages = 1)
      : (this.totalPages = Math.ceil(this.totalDocs / this.limit));

    this.page < this.totalPages
      ? (this.hasNextPage = true)
      : (this.hasNextPage = false);

    this.page > 1 ? (this.hasPrevPage = true) : (this.hasPrevPage = false);

    this.hasNextPage
      ? (this.nextPage = this.page + 1)
      : (this.nextPage = undefined);
    this.hasPrevPage
      ? (this.prevPage = this.page - 1)
      : (this.prevPage = undefined);
  }

  getOffset(): number {
    let offset = 0;
    this.page <= 1 ? (offset = 0) : (offset = (this.page - 1) * this.limit);

    return offset;
  }
}
