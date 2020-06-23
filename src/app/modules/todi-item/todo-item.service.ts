import { inject, injectable } from "inversify";
import { SqlDatabase } from "../../../infrastructure/database/sql/sql.connection";
import { Repository } from "typeorm";
import { TodoItem } from "../../../entities/todo-item.entity";
import { CreateTodoItemDto } from "./dto/create.todo-item.dto";
import { PaginationOptions } from "../../../infrastructure/database/sql/pagination/pagination.dto";
import { PaginationResponse } from "../../../infrastructure/database/sql/pagination/pagination-response";
import { ExpressQueryBuilder } from "../../../infrastructure/database/sql/query-builder/query-builder";
import { paginate } from "../../../infrastructure/database/sql/pagination/pagination.service";
import { InternalServerError } from "ts-http-errors/dist";
import { BadRequestError } from "ts-http-errors";

@injectable()
class TodoItemService {
  repository: Repository<TodoItem>;

  constructor(@inject(SqlDatabase) private readonly db: SqlDatabase) {
    db.connection.then((connection) => {
      this.repository = connection.getRepository(TodoItem);
    });
  }

  async find(
    userId: string,
    queryParams: any,
    options: PaginationOptions
  ): Promise<PaginationResponse<TodoItem>> {
    let query = null;

    try {
      query = new ExpressQueryBuilder(queryParams).build();
    } catch (e) {
      throw new BadRequestError(e);
    }

    try {
      return paginate(query, options, this.repository);
    } catch (e) {
      throw new InternalServerError(e);
    }
  }

  async create(dto: CreateTodoItemDto): Promise<TodoItem> {
    const item = await this.repository.create(dto);
    try {
      await this.repository.save(item);
    } catch (e) {
      throw new InternalServerError(e);
    }

    return item;
  }
}

export default TodoItemService;
