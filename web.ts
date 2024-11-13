import { HttpFactory, Route } from "./httpFactory.ts";

const getDataHandler = async (_req: Request): Promise<Response> => {
  const data = { message: "GET request received", timestamp: new Date() };
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

const postDataHandler = async (req: Request): Promise<Response> => {
  const body = await req.json();
  const response = { message: "POST request received", data: body };
  return new Response(JSON.stringify(response), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};

const routes: Route[] = [
  { method: "GET", path: "/data", handler: getDataHandler },
  { method: "POST", path: "/data", handler: postDataHandler },
];

const app = HttpFactory("/myapi", routes);

app.listen(8000);