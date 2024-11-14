const addCorsHeaders = async (req: Request): Promise<Request> => {
    const headers = new Headers(req.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    return new Request(req.url, {
      method: req.method,
      headers,
      body: req.body,
    });
  };

  export {addCorsHeaders}