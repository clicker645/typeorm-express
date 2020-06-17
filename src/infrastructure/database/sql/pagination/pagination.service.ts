import { PaginationResponse } from "./pagination-response";
import { SelectQueryBuilder } from "typeorm";
import { PaginationOptions } from "./pagination.dto";

export async function paginate<T>(
  query: SelectQueryBuilder<T>,
  options: PaginationOptions
): Promise<PaginationResponse<T>> {
  const countOfRecords = await query.getCount();

  const pagination = new PaginationResponse<T>();
  pagination.factory(options.limit, options.page, countOfRecords);

  options.limit ? query.take(options.limit) : query;
  options.page ? query.skip(pagination.getOffset()) : query;

  return new Promise<PaginationResponse<T>>(async (resolve, reject) => {
    let docs = null;

    try {
      docs = await query.getMany();
    } catch (e) {
      reject(e);
      return;
    }

    pagination.docs = docs;
    resolve(pagination);
  });
}
