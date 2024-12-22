import { createRouteHandler } from "uploadthing/next-legacy";
import { env } from "~/env";

import { ourFileRouter } from "~/server/uploadthing";

export default createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
  config: {
    token: env.UPLOADTHING_TOKEN,
  },
});
