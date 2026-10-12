import { z } from "zod";

function propertyToZod(schema: Record<string, unknown>): z.ZodTypeAny {
  const type = schema.type;

  if (type === "string") {
    return z.string();
  }
  if (type === "number" || type === "integer") {
    return z.number();
  }
  if (type === "boolean") {
    return z.boolean();
  }
  if (type === "array") {
    const items = schema.items;
    if (items && typeof items === "object" && !Array.isArray(items)) {
      return z.array(propertyToZod(items as Record<string, unknown>));
    }
    return z.array(z.unknown());
  }
  if (type === "object") {
    return jsonSchemaToZod(schema);
  }

  return z.unknown();
}

export function jsonSchemaToZod(
  schema: Record<string, unknown>,
): z.ZodObject<z.ZodRawShape> {
  const properties = schema.properties;
  if (!properties || typeof properties !== "object" || Array.isArray(properties)) {
    return z.object({}).passthrough();
  }

  const shape: z.ZodRawShape = {};
  for (const [key, value] of Object.entries(properties)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      shape[key] = propertyToZod(value as Record<string, unknown>);
    } else {
      shape[key] = z.unknown();
    }
  }

  return z.object(shape).passthrough();
}
