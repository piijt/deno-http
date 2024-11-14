const createHeaderMiddleware = (headers: Record<string, string>) => {
    return async (req: Request): Promise<Request> => {
      const modifiedHeaders = new Headers(req.headers);
      
      for (const [key, value] of Object.entries(headers)) {
        modifiedHeaders.set(key, value);
      }
  
      return new Request(req, { headers: modifiedHeaders });
    };
  };
  
  export { createHeaderMiddleware };