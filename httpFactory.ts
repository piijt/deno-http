interface Route {
  method: string;
  path: string;
  handler: (req: Request, params: Record<string, string>) => Promise<Response>;
}

interface Service {
  basePath: string;
  routes: Route[];
  middleware?: Array<(req: Request) => Promise<Request>>;
}
const matchRoute = (routePath: string, requestPath: string) => {
  const routeParts = routePath.split("/");
  const requestParts = requestPath.split("/");

  if (routeParts.length !== requestParts.length) return null;

  const params: Record<string, string> = {};
  console.log(routeParts);
  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(":")) {
      const paramName = routeParts[i].slice(1);
      params[paramName] = requestParts[i];
    } else if (routeParts[i] !== requestParts[i]) {
      return null;
    }
  }
  return params;
};

const HttpFactory = (services: Service[]) => {
  const handler = async (req: Request): Promise<Response> => {
    const url = new URL(req.url);

    for (const service of services) {
      let modifiedRequest = req;
      if (service.middleware) {
        for (const middleware of service.middleware) {
          console.log(middleware)
          modifiedRequest = await middleware(modifiedRequest);
        }
      }

      for (const route of service.routes) {
        const params = matchRoute(
          `${service.basePath}${route.path}`,
          url.pathname
        );

        if (params && route.method === modifiedRequest.method) {
          return route.handler(modifiedRequest, params);
        }
      }
    }

    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {},
      });
    }

    return new Response("Not Found", { status: 404 });
  };

  return {
    listen: (port: number) => {
      Deno.serve({ port }, handler);
    },
  };
};

export { HttpFactory };
export type { Route, Service };
