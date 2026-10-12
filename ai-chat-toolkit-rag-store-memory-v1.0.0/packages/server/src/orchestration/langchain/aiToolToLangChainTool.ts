import { tool } from "@langchain/core/tools";
import type { StructuredToolInterface } from "@langchain/core/tools";
import type { ToolRegistry } from "../../tool-registry/ToolRegistry.js";
import type { AiTool, ToolExecutionContext } from "../../types.js";
import { jsonSchemaToZod } from "./jsonSchemaToZod.js";

export function aiToolsToLangChainTools(
  aiTools: AiTool[],
  registry: ToolRegistry,
  context: ToolExecutionContext,
): StructuredToolInterface[] {
  return aiTools.map((aiTool) =>
    tool(
      async (input) => {
        const output = await registry.execute(
          {
            id: crypto.randomUUID(),
            name: aiTool.name,
            arguments: input as Record<string, unknown>,
          },
          context,
        );
        return output;
      },
      {
        name: aiTool.name,
        description: aiTool.description,
        schema: jsonSchemaToZod(aiTool.inputSchema),
      },
    ),
  );
}
