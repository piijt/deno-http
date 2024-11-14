const postExampleData = async (req: Request): Promise<Response> => {
    const body = await req.json();
    const response = { message: "Example POST request", data: body };
    return new Response(JSON.stringify(response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  };

  export {postExampleData}