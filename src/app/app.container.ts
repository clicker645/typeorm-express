import { Container, interfaces } from "inversify";

import App from "./app";
import { userContainer } from "./modules/user/user.container";
import { authContainer } from "./modules/auth/auth.container";
import { configContainer } from "../config/config.container";
import { redisContainer } from "../infrastructure/database/redis/redis.container";
import { sqlContainer } from "../infrastructure/database/sql/sql.container";
import { todoItemContainer } from "./modules/todi-item/todo-item.container";

export const Application = Symbol.for("Application");

export let appContainer = new Container() as interfaces.Container;
appContainer = Container.merge(appContainer, configContainer);
appContainer = Container.merge(appContainer, redisContainer);
appContainer = Container.merge(appContainer, sqlContainer);
appContainer = Container.merge(appContainer, userContainer);
appContainer = Container.merge(appContainer, authContainer);
appContainer = Container.merge(appContainer, todoItemContainer);

appContainer.bind(Application).to(App);
