export function getStyles(): string {
  return `
    :host {
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      --surface: #ffffff;
      --surface-muted: #f8fafc;
      --border: #e2e8f0;
      --text: #0f172a;
      --text-muted: #64748b;
      --user-bubble: #eff6ff;
      --assistant-bubble: #f1f5f9;
      --shadow: 0 10px 40px rgba(15, 23, 42, 0.15);
      --radius: 12px;
      --font: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        sans-serif;
      font-family: var(--font);
      font-size: 14px;
      line-height: 1.5;
      color: var(--text);
      position: fixed;
      z-index: 2147483000;
      pointer-events: none;
    }

    :host(.position-bottom-right) {
      bottom: 24px;
      right: 24px;
    }

    :host(.position-bottom-left) {
      bottom: 24px;
      left: 24px;
    }

    :host(.position-top-right) {
      top: 24px;
      right: 24px;
    }

    :host(.position-top-left) {
      top: 24px;
      left: 24px;
    }

    .root {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 16px;
      pointer-events: auto;
    }

    :host(.position-bottom-left) .root,
    :host(.position-top-left) .root {
      align-items: flex-start;
    }

    .root:has(.panel.open) .fab {
      display: none;
    }

    .fab {
      width: 56px;
      height: 56px;
      border: none;
      border-radius: 50%;
      background: var(--primary);
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow);
      transition: transform 0.15s ease, background 0.15s ease;
      overflow: hidden;
      padding: 0;
    }

    .fab:hover {
      background: var(--primary-hover);
      transform: scale(1.04);
    }

    .fab:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 3px;
    }

    .fab img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .fab svg {
      width: 26px;
      height: 26px;
    }

    .panel {
      display: none;
      flex-direction: column;
      width: min(380px, calc(100vw - 48px));
      height: min(520px, calc(100vh - 120px));
      background: var(--surface);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      border: 1px solid var(--border);
      overflow: hidden;
    }

    .panel.open {
      display: flex;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      background: var(--primary);
      color: #fff;
      flex-shrink: 0;
    }

    .header-logo {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      object-fit: cover;
      background: rgba(255, 255, 255, 0.2);
      flex-shrink: 0;
    }

    .header-logo.placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .header-logo.placeholder svg {
      width: 20px;
      height: 20px;
    }

    .header-text {
      flex: 1;
      min-width: 0;
    }

    .header-title {
      font-weight: 600;
      font-size: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .header-subtitle {
      font-size: 12px;
      opacity: 0.9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .close-btn {
      border: none;
      background: rgba(255, 255, 255, 0.15);
      color: inherit;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.15s ease;
    }

    .close-btn:hover {
      background: rgba(255, 255, 255, 0.25);
    }

    .close-btn svg {
      width: 18px;
      height: 18px;
    }

    .messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: var(--surface-muted);
    }

    .messages.empty {
      justify-content: center;
      align-items: center;
      color: var(--text-muted);
      text-align: center;
      font-size: 13px;
    }

    .message {
      max-width: 85%;
      padding: 10px 12px;
      border-radius: 12px;
      word-break: break-word;
      white-space: pre-wrap;
    }

    .message.user {
      align-self: flex-end;
      background: var(--user-bubble);
      border: 1px solid #dbeafe;
      border-bottom-right-radius: 4px;
    }

    .message.assistant {
      align-self: flex-start;
      background: var(--assistant-bubble);
      border: 1px solid var(--border);
      border-bottom-left-radius: 4px;
    }

    .message.error {
      align-self: stretch;
      max-width: 100%;
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #b91c1c;
      font-size: 13px;
    }

    .typing {
      align-self: flex-start;
      display: flex;
      gap: 4px;
      padding: 12px 14px;
      background: var(--assistant-bubble);
      border: 1px solid var(--border);
      border-radius: 12px;
      border-bottom-left-radius: 4px;
    }

    .typing span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--text-muted);
      animation: bounce 1.2s infinite ease-in-out;
    }

    .typing span:nth-child(2) {
      animation-delay: 0.15s;
    }

    .typing span:nth-child(3) {
      animation-delay: 0.3s;
    }

    @keyframes bounce {
      0%, 80%, 100% {
        transform: translateY(0);
        opacity: 0.4;
      }
      40% {
        transform: translateY(-4px);
        opacity: 1;
      }
    }

    .composer {
      display: flex;
      gap: 8px;
      padding: 12px;
      border-top: 1px solid var(--border);
      background: var(--surface);
      flex-shrink: 0;
    }

    .composer textarea {
      flex: 1;
      resize: none;
      min-height: 40px;
      max-height: 120px;
      padding: 10px 12px;
      border: 1px solid var(--border);
      border-radius: 10px;
      font: inherit;
      color: var(--text);
      background: var(--surface);
      outline: none;
      transition: border-color 0.15s ease;
    }

    .composer textarea:focus {
      border-color: var(--primary);
    }

    .composer textarea:disabled,
    .composer textarea:read-only {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .send-btn {
      width: 44px;
      height: 44px;
      align-self: flex-end;
      border: none;
      border-radius: 10px;
      background: var(--primary);
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.15s ease;
    }

    .send-btn:hover:not(:disabled) {
      background: var(--primary-hover);
    }

    .send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .send-btn svg {
      width: 20px;
      height: 20px;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;
}

export const CHAT_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`;

export const CLOSE_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

export const SEND_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`;
