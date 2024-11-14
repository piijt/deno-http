import { Service } from './index.d.ts'

const matchRoute = (routePath: string, requestPath: string) => {
    const routeParts = routePath.split("/");
    const requestParts = requestPath.split("/");
  
    if (routeParts.length !== requestParts.length) return null;
  
    const params: Record<string, string> = {};
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

  const requestHandler = async (req: Request, services: Service[]): Promise<Response> => {
    const url = new URL(req.url);
  
    for (const service of services) {
      let modifiedRequest = req;
      
      if (service.middleware) {
        for (const middleware of service.middleware) {
          modifiedRequest = await middleware(modifiedRequest);
        }
      }
  
      for (const route of service.routes) {
        const params = matchRoute(`${service.namespace}${route.path}`, url.pathname);
  
        if (params && route.method === modifiedRequest.method) {
          const response = await route.handler(modifiedRequest, params);
  
          const newHeaders = new Headers(response.headers); 
          console.log(newHeaders)
          newHeaders.set("x-api", "your-api-key-or-value"); 
          
          return new Response(response.body, {
            ...response,
            headers: newHeaders, 
          });
        }
      }
    }
  
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }
  
    return new Response("Not Found", { status: 404 });
  };
  
  export { requestHandler };