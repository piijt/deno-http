import { HttpFactory } from "./http/httpFactory.ts";
import service from "./services/hello-world/index.ts";

const services = [
  service,
];

const app = HttpFactory(services);

app.listen(8000);