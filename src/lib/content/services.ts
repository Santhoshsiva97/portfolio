import { z } from "zod";
import raw from "@content/services.json";
import { servicesSchema, type Services } from "./schemas";

const parsed = servicesSchema.safeParse(raw);
if (!parsed.success) {
  throw new Error(
    `content/services.json is invalid:\n${z.prettifyError(parsed.error)}`,
  );
}

const services: Services = parsed.data;

export function getServices(): Services {
  return services;
}
