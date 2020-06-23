import { SqlDatabase } from "../../../infrastructure/database/sql/sql.connection";
import { User } from "../../../entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { PaginationResponse } from "../../../infrastructure/database/sql/pagination/pagination-response";
import { paginate } from "../../../infrastructure/database/sql/pagination/pagination.service";
import { PaginationOptions } from "../../../infrastructure/database/sql/pagination/pagination.dto";
import { ExpressQueryBuilder } from "../../../infrastructure/database/sql/query-builder/query-builder";
import { inject, injectable } from "inversify";
import { BadRequestError, InternalServerError } from "ts-http-errors";

@injectable()
export class UserService {
  repository: Repository<User>;

  constructor(@inject(SqlDatabase) private readonly db: SqlDatabase) {
    console.log("UserService init");
    db.connection.then((connection) => {
      this.repository = connection.getRepository(User);
    });
  }

  async find(
    queryParams: any,
    options: PaginationOptions
  ): Promise<PaginationResponse<User>> {
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

  async findOne(queryParams: any): Promise<User> {
    let query = null;

    try {
      query = new ExpressQueryBuilder(queryParams).build();
    } catch (e) {
      throw new BadRequestError(e);
    }

    try {
      return this.repository.findOne(query);
    } catch (e) {
      throw new InternalServerError(e);
    }
  }

  async create(dto: CreateUserDto) {
    let result = null;
    const user = await User.create(dto);

    try {
      result = await this.repository.save(user);
    } catch (e) {
      throw new InternalServerError(e);
    }

    return result;
  }
}
