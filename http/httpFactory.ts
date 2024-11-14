import { Service } from "./index.d.ts";
import { requestHandler } from "./requestHandler.ts";

const HttpFactory = (services: Service[]) => {
  return {
    listen: (port: number) => {
      console.log(`Server running on http://localhost:${port}`);
      Deno.serve(
        { port },
        async (req: Request) => await requestHandler(req, services) // Ensure the result is awaited here
      );
    },
  };
};

export { HttpFactory };

