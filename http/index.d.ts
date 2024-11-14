export interface Route {
    method: string;
    path: string;
    handler: (req: Request, params: Record<string, string>) => Promise<Response>;
  }
  
export interface Service {
    namespace: string;
    routes: Route[];
    middleware?: Array<(req: Request) => Promise<Request>>;
}
