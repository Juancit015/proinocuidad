import { CHAT_ICON_SVG, CLOSE_ICON_SVG, getStyles, SEND_ICON_SVG } from "./styles.js";
import type {
  ChatMessage,
  ChatRequestPayload,
  ChatResponsePayload,
  WidgetConfig,
  WidgetPosition,
} from "./types.js";

const TAG_NAME = "ai-chat";
const DEFAULT_PATH = "/ai-chat/custom";
const DEFAULT_TITLE = "AI Assistant";
const DEFAULT_SUBTITLE = "How can I help you today?";
const DEFAULT_PLACEHOLDER = "Type a message…";
const DEFAULT_PRIMARY_COLOR = "#2563eb";
const DEFAULT_POSITION: WidgetPosition = "bottom-right";

const POSITION_CLASSES = [
  "position-bottom-right",
  "position-bottom-left",
  "position-top-right",
  "position-top-left",
] as const;

const OBSERVED_ATTRIBUTES = [
  "title",
  "subtitle",
  "logo",
  "primary-color",
  "backend-url",
  "path",
  "placeholder",
  "position",
] as const;

function shadeColor(hex: string, percent: number): string {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) {
    return hex;
  }

  const num = parseInt(normalized, 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + percent));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + percent));
  const b = Math.min(255, Math.max(0, (num & 0xff) + percent));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function normalizePath(path: string): string {
  if (!path) {
    return DEFAULT_PATH;
  }
  return path.startsWith("/") ? path : `/${path}`;
}

function resolveBackendUrl(value: string | null): string {
  if (value?.trim()) {
    return value.trim().replace(/\/$/, "");
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return "";
}

function parseResponseText(payload: ChatResponsePayload): string {
  const raw = payload.message ?? payload.response;
  const text = typeof raw === "string" ? raw : String(raw ?? "");
  if (!text.trim()) {
    throw new Error("Backend returned an empty response.");
  }
  return text.trim();
}

function historyForBackend(messages: ChatMessage[]): ChatMessage[] {
  return messages.filter(
    (message): message is ChatMessage & { role: "user" | "assistant" } =>
      message.role === "user" || message.role === "assistant",
  );
}

export class AiChatElement extends HTMLElement {
  static readonly tagName = TAG_NAME;

  static get observedAttributes(): string[] {
    return [...OBSERVED_ATTRIBUTES];
  }

  #shadow: ShadowRoot;
  #messages: ChatMessage[] = [];
  #isOpen = false;
  #isLoading = false;

  #fab!: HTMLButtonElement;
  #panel!: HTMLDivElement;
  #messagesEl!: HTMLDivElement;
  #input!: HTMLTextAreaElement;
  #sendBtn!: HTMLButtonElement;
  #closeBtn!: HTMLButtonElement;
  #composer!: HTMLFormElement;
  #headerLogo!: HTMLDivElement;
  #headerTitle!: HTMLSpanElement;
  #headerSubtitle!: HTMLSpanElement;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: "open" });
    this.#render();
  }

  connectedCallback(): void {
    this.#syncFromAttributes();
    this.#bindEvents();
  }

  disconnectedCallback(): void {
    this.#unbindEvents();
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    _newValue: string | null,
  ): void {
    if (!this.isConnected) {
      return;
    }
    this.#syncFromAttributes();
    if (name === "title" || name === "subtitle" || name === "logo") {
      this.#updateHeader();
      this.#updateFab();
    }
  }

  get config(): WidgetConfig {
    return {
      title: this.getAttribute("title")?.trim() || DEFAULT_TITLE,
      subtitle: this.getAttribute("subtitle")?.trim() || DEFAULT_SUBTITLE,
      logo: this.getAttribute("logo")?.trim() || "",
      primaryColor:
        this.getAttribute("primary-color")?.trim() || DEFAULT_PRIMARY_COLOR,
      backendUrl: resolveBackendUrl(this.getAttribute("backend-url")),
      path: normalizePath(this.getAttribute("path")?.trim() || DEFAULT_PATH),
      placeholder:
        this.getAttribute("placeholder")?.trim() || DEFAULT_PLACEHOLDER,
      position: this.#getPosition(),
    };
  }

  open(): void {
    this.#isOpen = true;
    this.#panel.classList.add("open");
    this.#fab.hidden = true;
    this.#fab.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => this.#input.focus());
  }

  close(): void {
    this.#isOpen = false;
    this.#panel.classList.remove("open");
    this.#fab.hidden = false;
    this.#fab.setAttribute("aria-expanded", "false");
  }

  toggle(): void {
    if (this.#isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  clearHistory(): void {
    this.#messages = [];
    this.#renderMessages();
  }

  #getPosition(): WidgetPosition {
    const value = this.getAttribute("position")?.trim() as WidgetPosition;
    const allowed: WidgetPosition[] = [
      "bottom-right",
      "bottom-left",
      "top-right",
      "top-left",
    ];
    return allowed.includes(value) ? value : DEFAULT_POSITION;
  }

  #render(): void {
    const style = document.createElement("style");
    style.textContent = getStyles();

    const root = document.createElement("div");
    root.className = "root";
    root.innerHTML = `
      <button type="button" class="fab" aria-label="Open chat" aria-expanded="false">
        ${CHAT_ICON_SVG}
      </button>
      <div class="panel" role="dialog" aria-label="Chat panel">
        <header class="header">
          <div class="header-logo placeholder" aria-hidden="true">${CHAT_ICON_SVG}</div>
          <div class="header-text">
            <div class="header-title"></div>
            <div class="header-subtitle"></div>
          </div>
          <button type="button" class="close-btn" aria-label="Close chat">
            ${CLOSE_ICON_SVG}
          </button>
        </header>
        <div class="messages empty" role="log" aria-live="polite" aria-relevant="additions">
          <p>Start a conversation — we're here to help.</p>
        </div>
        <form class="composer" part="composer">
          <label class="sr-only" for="message-input">Message</label>
          <textarea
            id="message-input"
            rows="1"
            autocomplete="off"
            placeholder="${DEFAULT_PLACEHOLDER}"
          ></textarea>
          <button type="submit" class="send-btn" aria-label="Send message">
            ${SEND_ICON_SVG}
          </button>
        </form>
      </div>
    `;

    this.#shadow.replaceChildren(style, root);

    this.#fab = this.#shadow.querySelector(".fab")!;
    this.#panel = this.#shadow.querySelector(".panel")!;
    this.#messagesEl = this.#shadow.querySelector(".messages")!;
    this.#input = this.#shadow.querySelector("textarea")!;
    this.#sendBtn = this.#shadow.querySelector(".send-btn")!;
    this.#closeBtn = this.#shadow.querySelector(".close-btn")!;
    this.#composer = this.#shadow.querySelector(".composer")!;
    this.#headerLogo = this.#shadow.querySelector(".header-logo")!;
    this.#headerTitle = this.#shadow.querySelector(".header-title")!;
    this.#headerSubtitle = this.#shadow.querySelector(".header-subtitle")!;
  }

  #bindEvents(): void {
    this.#fab.addEventListener("click", this.#onFabClick);
    this.#closeBtn.addEventListener("click", this.#onCloseClick);
    this.#composer.addEventListener("submit", this.#onSubmit);
    this.#input.addEventListener("keydown", this.#onInputKeydown);
    this.#input.addEventListener("input", this.#resizeInput);
  }

  #unbindEvents(): void {
    this.#fab.removeEventListener("click", this.#onFabClick);
    this.#closeBtn.removeEventListener("click", this.#onCloseClick);
    this.#composer.removeEventListener("submit", this.#onSubmit);
    this.#input.removeEventListener("keydown", this.#onInputKeydown);
    this.#input.removeEventListener("input", this.#resizeInput);
  }

  #onFabClick = (): void => {
    this.toggle();
  };

  #onCloseClick = (): void => {
    this.close();
  };

  #onSubmit = (event: Event): void => {
    event.preventDefault();
    void this.#sendMessage();
  };

  #onInputKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void this.#sendMessage();
    }
  };

  #syncFromAttributes(): void {
    const { primaryColor, position, placeholder } = this.config;
    this.style.setProperty("--primary", primaryColor);
    this.style.setProperty("--primary-hover", shadeColor(primaryColor, -20));
    this.#applyPosition(position);
    if (this.#input) {
      this.#input.placeholder = placeholder;
    }
    this.#updateHeader();
    this.#updateFab();
    this.#restorePanelState();
  }

  #applyPosition(position: WidgetPosition): void {
    for (const className of POSITION_CLASSES) {
      this.classList.remove(className);
    }
    this.classList.add(`position-${position}`);
  }

  #restorePanelState(): void {
    if (!this.#panel || !this.#fab) {
      return;
    }
    this.#panel.classList.toggle("open", this.#isOpen);
    this.#fab.hidden = this.#isOpen;
    this.#fab.setAttribute("aria-expanded", String(this.#isOpen));
  }

  #updateHeader(): void {
    const { title, subtitle, logo } = this.config;
    this.#headerTitle.textContent = title;
    this.#headerSubtitle.textContent = subtitle;

    if (logo) {
      const img = document.createElement("img");
      img.src = this.#escapeAttr(logo);
      img.alt = "";
      img.addEventListener(
        "error",
        () => {
          this.#headerLogo.className = "header-logo placeholder";
          this.#headerLogo.innerHTML = CHAT_ICON_SVG;
        },
        { once: true },
      );
      this.#headerLogo.className = "header-logo";
      this.#headerLogo.replaceChildren(img);
    } else {
      this.#headerLogo.className = "header-logo placeholder";
      this.#headerLogo.innerHTML = CHAT_ICON_SVG;
    }
  }

  #updateFab(): void {
    const { logo } = this.config;
    if (logo) {
      const img = document.createElement("img");
      img.src = this.#escapeAttr(logo);
      img.alt = "";
      img.addEventListener(
        "error",
        () => {
          this.#fab.innerHTML = CHAT_ICON_SVG;
        },
        { once: true },
      );
      this.#fab.replaceChildren(img);
    } else {
      this.#fab.innerHTML = CHAT_ICON_SVG;
    }
  }

  #escapeAttr(value: string): string {
    return value
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  #resizeInput = (): void => {
    this.#input.style.height = "auto";
    this.#input.style.height = `${Math.min(this.#input.scrollHeight, 120)}px`;
  };

  #setLoading(loading: boolean): void {
    this.#isLoading = loading;
    // readOnly keeps focus in the textarea; disabled would blur it
    this.#input.readOnly = loading;
    this.#sendBtn.disabled = loading;
    this.#renderMessages();
    if (!loading) {
      this.#focusInput();
    }
  }

  #focusInput(): void {
    if (!this.#isOpen || this.#isLoading) {
      return;
    }
    requestAnimationFrame(() => {
      this.#input.focus();
    });
  }

  async #sendMessage(): Promise<void> {
    const text = this.#input.value.trim();
    if (!text || this.#isLoading) {
      return;
    }

    this.#setLoading(true);

    const userMessage: ChatMessage = { role: "user", content: text };
    this.#messages.push(userMessage);
    this.#input.value = "";
    this.#resizeInput();
    this.#renderMessages();

    try {
      const reply = await this.#fetchReply(text);
      this.#messages.push({ role: "assistant", content: reply });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      this.#messages.push({ role: "error", content: message });
    } finally {
      this.#setLoading(false);
    }
  }

  async #fetchReply(latestMessage: string): Promise<string> {
    const { backendUrl, path } = this.config;
    if (!backendUrl) {
      throw new Error("Backend URL is not configured.");
    }

    const url = `${backendUrl}${normalizePath(path)}`;
    const payload: ChatRequestPayload = {
      message: latestMessage,
      history: historyForBackend(this.#messages).slice(0, -1),
    };

    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      throw new Error(
        `Request to ${url} failed. The server may be offline, the URL may be wrong, or the browser blocked the request (CORS). Enable CORS on the API or proxy it through the same domain as this page.`,
      );
    }

    let body: unknown;
    try {
      body = await response.json();
    } catch {
      throw new Error(
        response.ok
          ? "Backend returned an invalid JSON response."
          : `Request failed (${response.status}).`,
      );
    }

    if (!response.ok) {
      throw new Error(this.#parseErrorMessage(body, response.status));
    }

    return parseResponseText(body as ChatResponsePayload);
  }

  #parseErrorMessage(body: unknown, status: number): string {
    if (typeof body === "object" && body !== null) {
      if ("error" in body) {
        const errorValue = (body as { error: unknown }).error;
        if (typeof errorValue === "string" && errorValue.trim()) {
          return errorValue;
        }
        if (
          typeof errorValue === "object" &&
          errorValue !== null &&
          "message" in errorValue &&
          typeof (errorValue as { message: unknown }).message === "string"
        ) {
          return (errorValue as { message: string }).message;
        }
      }
      if (
        "message" in body &&
        typeof (body as { message: unknown }).message === "string"
      ) {
        return (body as { message: string }).message;
      }
    }
    return `Request failed (${status}).`;
  }

  #renderMessages(): void {
    const fragment = document.createDocumentFragment();

    if (this.#messages.length === 0 && !this.#isLoading) {
      this.#messagesEl.className = "messages empty";
      const empty = document.createElement("p");
      empty.textContent = "Start a conversation — we're here to help.";
      fragment.appendChild(empty);
    } else {
      this.#messagesEl.className = "messages";
      for (const msg of this.#messages) {
        const el = document.createElement("div");
        el.className = `message ${msg.role}`;
        if (msg.role === "error") {
          el.setAttribute("role", "alert");
        }
        el.textContent = msg.content;
        fragment.appendChild(el);
      }

      if (this.#isLoading) {
        const typing = document.createElement("div");
        typing.className = "typing";
        typing.setAttribute("aria-label", "Assistant is typing");
        typing.innerHTML = "<span></span><span></span><span></span>";
        fragment.appendChild(typing);
      }
    }

    this.#messagesEl.replaceChildren(fragment);
    this.#messagesEl.scrollTop = this.#messagesEl.scrollHeight;
  }
}

export function registerAiChatElement(
  tagName: string = TAG_NAME,
): typeof AiChatElement {
  if (typeof customElements !== "undefined" && !customElements.get(tagName)) {
    customElements.define(tagName, AiChatElement);
  }
  return AiChatElement;
}

registerAiChatElement();

export type { ChatMessage, WidgetConfig, WidgetPosition } from "./types.js";
