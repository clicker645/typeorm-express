import { Container } from "inversify";
import { Config } from "./config";

export const configContainer = new Container();
configContainer.bind(Config).to(Config).inSingletonScope();
