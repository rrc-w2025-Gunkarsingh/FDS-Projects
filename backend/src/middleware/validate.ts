import type { RequestHandler } from "express";
import type { ZodType } from "zod";

// Check the request body or URL parameters
export const validate = (
  schema: ZodType,
  source: "body" | "params" = "body"
): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      res.status(400).json({
        error: "Invalid request",
        details: result.error.issues,
      });
      return;
    }

    next();
  };
};