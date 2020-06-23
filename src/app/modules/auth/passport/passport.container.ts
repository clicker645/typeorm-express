import { Container, interfaces } from "inversify";
import { strategyContainer } from "./strategies/strategy.container";
import { Passport } from "./index";

export let passportContainer = new Container() as interfaces.Container;
passportContainer = Container.merge(passportContainer, strategyContainer);

passportContainer.bind(Passport).to(Passport).inSingletonScope();
