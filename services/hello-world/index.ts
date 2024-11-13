import { Route, Service } from "../../httpFactory.ts";

const getExampleData = async (_req: Request): Promise<Response> => {
  const data = { message: "Example GET request", timestamp: new Date() };
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

const postExampleData = async (req: Request): Promise<Response> => {
  const body = await req.json();
  const response = { message: "Example POST request", data: body };
  return new Response(JSON.stringify(response), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};

const routes: Route[] = [
  { method: "GET", path: "/data", handler: getExampleData },
  { method: "POST", path: "/data", handler: postExampleData },
];

const exampleService: Service = {
  basePath: "/hello-world",
  routes,
};

export default exampleService;