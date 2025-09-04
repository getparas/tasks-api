import { Scalar } from "@scalar/hono-api-reference";

import type { AppOpenApi } from "./types.js";

import packageJSON from "../../package.json" with { type: "json" };

export default function configureOpenApi(app: AppOpenApi) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Tasks API",
      description: "Tasks API",
    },
  });
  app.get("/scalar", Scalar({ url: "/doc" }));
}
