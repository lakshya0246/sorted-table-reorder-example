export interface Toast {
  id: string;
  title: string;
  callbackTitle?: string;
  callback?: () => void;
}

export interface UtilsState {
  toasts: Toast[];
}
