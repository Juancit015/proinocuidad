export type ChatRole = "user" | "assistant" | "error";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export type WidgetPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export interface WidgetConfig {
  title: string;
  subtitle: string;
  logo: string;
  primaryColor: string;
  backendUrl: string;
  path: string;
  placeholder: string;
  position: WidgetPosition;
}

export interface ChatRequestPayload {
  message: string;
  history: ChatMessage[];
}

export interface ChatResponsePayload {
  message?: string;
  response?: string;
}
