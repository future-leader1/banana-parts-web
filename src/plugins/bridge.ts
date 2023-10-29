import { osState } from './ridge';

type Action = 'log' | 'error';

interface Command {
  kind?: 'webview';
  action: Exclude<
    keyof typeof Bridge,
    'prototype' | 'os' | 'postMessage' | 'handleMessageEvent'
  >;
  value?: any;
}

function tryParseJSON(jsonString: any) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

export class Bridge {
  static os: string;

  static postMessage(action: Action, value?: any) {
    const data = JSON.stringify({ action, value });
    (window as any).ReactNativeWebView?.postMessage(data);
  }

  static handleMessageEvent({ data }: MessageEvent) {
    const command = tryParseJSON(data) as Command;
    if (command?.kind !== 'webview') return;
    if (Bridge[command.action]) {
      Bridge[command.action](command.value);
    } else {
      Bridge.postMessage('error', `(RN -> WebView) Invalid action: ${data}`);
    }
  }

  static init({ os }: any) {
    osState.set(os ?? 'webView');
  }
}

// @ts-ignore
document.addEventListener('message', Bridge.handleMessageEvent);
window.addEventListener('message', Bridge.handleMessageEvent);
