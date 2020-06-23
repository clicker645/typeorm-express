import { SqlDatabase } from "../../infrastructure/database/sql/sql.connection";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { PaginationResponse } from "../../infrastructure/database/sql/pagination/pagination-response";
import { paginate } from "../../infrastructure/database/sql/pagination/pagination.service";
import { PaginationOptions } from "../../infrastructure/database/sql/pagination/pagination.dto";
import { ExpressQueryBuilder } from "../../infrastructure/database/sql/query-builder/query-builder";
import { Injectable } from "@decorators/di";

@Injectable()
export class UserService {
  repository: Repository<User>;

  constructor(private readonly db: SqlDatabase) {
    console.log("UserService init");
    db.connection
      .then((connection) => {
        this.repository = connection.getRepository(User);
      })
  }

  async find(
    queryParams: any,
    options: PaginationOptions
  ): Promise<PaginationResponse<User>> {
    const query = new ExpressQueryBuilder(queryParams).build();

    return paginate(query, options, this.repository);
  }

  async findOne(queryParams: any): Promise<User> {
    const query = new ExpressQueryBuilder(queryParams).build();

    return this.repository.findOne(query);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.repository.create(dto);
    const result = await this.repository.save(user);

    return result;
  }
}
