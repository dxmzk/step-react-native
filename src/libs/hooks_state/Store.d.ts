/**
 * Author: Meng
 * Date: 2023-
 * Desc:
 */

interface ErrorInfo {
  // Captures which component contained the exception, and its ancestors.
  componentStack: string;
}

declare class Store {
  onCreate(props: any): void;

  onShow(): void;

  getBeforeUpdate(prevProps: any, prevState: any): void;

  onUpdate(prevProps: any, prevState: any, snapshot: any): void;

  onCatch(error: Error, errorInfo: ErrorInfo): void;

  shouldUpdate(nextProps: any, nextState: any, nextContext: any): boolean;

  onDestroy(): void;
}

export default Store;
