import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCode from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import { insertTasksSchema, selectTasksSchema } from "@/db/schema.js";

const tags = ["Tasks"];

export const list = createRoute({
  tags,
  path: "/tasks",
  method: "get",
  responses: {
    [HttpStatusCode.OK]: jsonContent(
      z.array(selectTasksSchema),
      "The list of tasks",
    ),
  },
});

export const create = createRoute({
  path: "/tasks",
  method: "post",
  request: {
    body: jsonContentRequired(
      insertTasksSchema,
      "The task is create",
    ),
  },
  tags,
  responses: {
    [HttpStatusCode.OK]: jsonContent(
      selectTasksSchema,
      "The created task",
    ),
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      "The validation error(s)",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
