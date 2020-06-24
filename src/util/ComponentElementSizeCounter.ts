import { Node as ESNode } from "estree";
import { VariableDeclarator, FunctionDeclaration } from "estree-jsx";

interface Options {
  min?: number;
  max?: number;
  message: string;
  report: (descriptor: { node: ESNode; message: string }) => void;
}

interface CountLog {
  error: boolean;
  counter: number;
  parentNode: ESNode;
}

export class ComponentElementSizeCounter {
  private logs: Array<CountLog> = [];

  private options: Options;

  constructor(options: Options) {
    this.options = options;
  }

  private isSizeOver(log: CountLog): boolean {
    const { max = 0, min = 0 } = this.options;

    return log.counter > max || log.counter < min;
  }

  private report(log: CountLog) {
    if (log.error || !this.isSizeOver(log)) return;

    this.options.report({
      node: log.parentNode,
      message: this.options.message,
    });
  }

  count() {
    const log = this.logs.slice(-1)[0];

    if (log) {
      log.counter += 1;
    }
  }

  close(node: VariableDeclarator | FunctionDeclaration) {
    this.logs = this.logs.filter((log) => {
      if (log.parentNode === node) {
        this.report(log);
        return false;
      }

      return true;
    });
  }

  start(node: VariableDeclarator | FunctionDeclaration) {
    this.logs.push({
      counter: 0,
      error: false,
      parentNode: node,
    });
  }
}
