interface Route {
  method: string;
  path: string;
  handler: (req: Request) => Promise<Response>;
}

interface Service {
  basePath: string;
  routes: Route[];
}

const HttpFactory = (services: Service[]) => {
  const handler = async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    
    for (const service of services) {
      const matchedRoute = service.routes.find(route =>
        url.pathname === `${service.basePath}${route.path}` && route.method === req.method
      );

      if (matchedRoute) {
        return matchedRoute.handler(req);
      }
    }

    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Allow": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    return new Response("Not Found", { status: 404 });
  };

  return {
    listen: (port: number) => {
      console.log(`Server running on http://localhost:${port}`);
      Deno.serve({ port }, handler);
    },
  };
};

export { HttpFactory };
export type { Route, Service };
