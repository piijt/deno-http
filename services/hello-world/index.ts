import { Route, Service } from "../../http/index.d.ts";
import { addCorsHeaders, setXApiHeaderMiddleware, createHeaderMiddleware } from "../shared/middleware/index.middleware.ts";
import { postExampleData, getExampleData, getOrgData } from "./controllers/index.controller.ts";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "x-api-key": "123"
}

const routes: Route[] = [
  { method: "GET", path: "/data", handler: getExampleData },
  { method: "POST", path: "/data", handler: postExampleData },
  { method: "GET", path: "/org/:org/:id", handler: getOrgData }
];

const exampleService: Service = {
  namespace: "/hello-world",
  routes,
  middleware: [createHeaderMiddleware(headers)]
};

export default exampleService;