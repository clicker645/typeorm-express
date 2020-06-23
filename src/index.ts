import "reflect-metadata";
import App from "./app/app";
import { appContainer, Application } from "./app/app.container";
import errorWrapMiddleware from "./middleware/error-wrap.middleware";
import * as cluster from "cluster";
import * as os from "os";
//
// if (cluster.isMaster) {
//   const cpuCount = os.cpus().length;
//   for (let i = 0; i < cpuCount; i += 1) {
//     cluster.fork();
//   }
//
//   cluster.on("exit", function (worker) {
//     // Replace the dead worker, we're not sentimental
//     console.log("Worker %d died :(", worker.id);
//     cluster.fork();
//   });
// } else {
//   const app = appContainer.get(Application) as App;
//
//   app.app.use(errorWrapMiddleware);
//   app.listen(
//     `App listening on the http://localhost:5000}, worker: ${cluster.worker.id}`
//   );
// }

const app = appContainer.get(Application) as App;

app.app.use(errorWrapMiddleware);
app.listen(`App listening on the http://localhost:5000}`);
