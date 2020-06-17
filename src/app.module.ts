import { authModule } from "./modules/auth/auth.module";
import Module from "./types/modele.type";
import AuthController from "./modules/auth/auth.controller";
import { userModule } from "./modules/user/user.module";
import { UserController } from "./modules/user/user.controller";

export const AppModule: Module = {
  controllers: [authModule.get(AuthController), userModule.get(UserController)],
};

export default AppModule;
