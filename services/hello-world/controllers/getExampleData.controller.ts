const getExampleData = async (_req: Request): Promise<Response> => {
    const data = { message: "Example GET request", timestamp: new Date() };
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  export {getExampleData}