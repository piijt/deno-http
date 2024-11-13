interface Route {
  method: string;
  path: string;
  handler: (req: Request) => Promise<Response>;
}

const HttpFactory = (basePath: string, routes: Route[]) => {
  const handler = async (req: Request): Promise<Response> => {
    const url = new URL(req.url);

    const matchedRoute = routes.find(route => 
      url.pathname === `${basePath}${route.path}` && route.method === req.method
    );

    if (matchedRoute) {
      // Call the route handler if found
      return matchedRoute.handler(req);
    } else if (req.method === "OPTIONS") {
      // Handle CORS preflight
      return new Response(null, {
        status: 204,
        headers: {
          "Allow": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    } else {
      return new Response("Not Found", { status: 404 });
    }
  };

  return {
    listen: (port: number) => {
      console.log(`Server running on http://localhost:${port}${basePath}`);
      Deno.serve({ port }, handler);
    },
  };
};

export { HttpFactory };
export type { Route };
