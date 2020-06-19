import { PaginationResponse } from "./pagination-response";
import { FindManyOptions, Repository } from "typeorm";
import { PaginationOptions } from "./pagination.dto";

export async function paginate<T>(
  query: FindManyOptions<T>,
  options: PaginationOptions,
  repository: Repository<T>
): Promise<PaginationResponse<T>> {
  const countOfRecords = await repository.count(query);

  const pagination = new PaginationResponse<T>();

  pagination.factory(options.limit, options.page, countOfRecords);

  options.limit ? (query.take = options.limit) : query;
  options.page ? (query.skip = pagination.getOffset()) : query;

  return new Promise<PaginationResponse<T>>(async (resolve, reject) => {
    let docs = null;

    try {
      docs = await repository.find(query);
    } catch (e) {
      reject(e);
      return;
    }

    pagination.docs = docs;
    resolve(pagination);
  });
}
