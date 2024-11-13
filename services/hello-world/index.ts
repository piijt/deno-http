import { Route, Service } from "../../httpFactory.ts";

const addCorsHeaders = async (req: Request): Promise<Request> => {
    const headers = new Headers(req.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    
    // Return a new request with the modified headers
    return new Request(req.url, {
      method: req.method,
      headers,
      body: req.body,
    });
  };

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

const getOrgData = async (req: Request, params: Record<string, string>): Promise<Response> => {
    const { org, id } = params;
    console.log({req})
    const data = { message: `GET request for org: ${org}, id: ${id}`, timestamp: new Date() };
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: req.headers,
    });
  };

const routes: Route[] = [
  { method: "GET", path: "/data", handler: getExampleData },
  { method: "POST", path: "/data", handler: postExampleData },
  { method: "GET", path: "/org/:org/:id", handler: getOrgData }
];

const exampleService: Service = {
  basePath: "/hello-world",
  routes,
  middleware: [addCorsHeaders]
};

export default exampleService;