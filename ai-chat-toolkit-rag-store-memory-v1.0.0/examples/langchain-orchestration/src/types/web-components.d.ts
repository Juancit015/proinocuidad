import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface AiChatAttributes {
  title?: string;
  subtitle?: string;
  logo?: string;
  "primary-color"?: string;
  "backend-url"?: string;
  path?: string;
  placeholder?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ai-chat": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & AiChatAttributes,
        HTMLElement
      >;
    }
  }
}
