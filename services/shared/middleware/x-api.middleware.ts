const setXApiHeaderMiddleware = async (req: Request): Promise<Request> => {
    // Clone the request so we can modify its headers
    const modifiedHeaders = new Headers(req.headers);
    modifiedHeaders.set("x-api", "your-api-key-or-value");
  
    return new Request(req, {
      headers: modifiedHeaders,
    });
  };
  
  export { setXApiHeaderMiddleware };