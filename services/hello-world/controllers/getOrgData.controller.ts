const getOrgData = async (req: Request, params: Record<string, string>): Promise<Response> => {
    const { org, id } = params;
    const data = { message: `GET request for org: ${org}, id: ${id}`, timestamp: new Date() };
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: req.headers,
    });
};

export {getOrgData}