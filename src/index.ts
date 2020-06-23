import "reflect-metadata";
import App from "./app/app";
import { appContainer, Application } from "./app/app.container";

const app = appContainer.get(Application) as App;

app.listen();
