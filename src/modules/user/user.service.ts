import { inject, injectable } from "inversify";
import { SqlDatabase } from "../../infrastructure/database/sql/sql.connection";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { QueryUserDto } from "./dto/query-user.dto";
import { PaginationResponse } from "../../infrastructure/database/sql/pagination/pagination-response";
import { paginate } from "../../infrastructure/database/sql/pagination/pagination.service";
import { PaginationOptions } from "../../infrastructure/database/sql/pagination/pagination.dto";

@injectable()
export class UserService {
  repository: Repository<User>;

  constructor(@inject(SqlDatabase) private readonly db: SqlDatabase) {
    db.connection
      .then((connection) => {
        this.repository = connection.getRepository(User);
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  async findBy(
    params: QueryUserDto,
    pagination: PaginationOptions
  ): Promise<PaginationResponse<User>> {
    let query = this.repository.createQueryBuilder("user");

    params.login
      ? (query = query.where("user.login = :login", { login: params.login }))
      : query;
    params.email
      ? (query = query.andWhere("user.email like :email", {
          email: `%${params.email}%`,
        }))
      : query;

    return paginate(query, pagination);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.repository.create(dto);
    const result = await this.repository.save(user);

    return result;
  }
}
