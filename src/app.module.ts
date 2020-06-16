import { authModule } from "./modules/auth/auth.module";
import Module from "./types/modele.type";
import { authTypes } from "./modules/auth/auth.constants";
import AuthController from "./modules/auth/auth.controller";

export const AppModule: Module = {
  controllers: [authModule.get(AuthController)],
};

export default AppModule;
