import { Rule } from "eslint";
import { Node as ESNode } from "estree";
import { Node, VariableDeclarator, FunctionDeclaration } from "estree-jsx";

interface Options {
  min?: number;
  max?: number;
  message: string;
  context: Rule.RuleContext;
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

    if (log.counter > max || log.counter < min) {
      return true;
    }

    return false;
  }

  private report(log: CountLog) {
    if (log.error || !this.isSizeOver(log)) return;

    log.error = true;

    this.options.context.report({
      node: log.parentNode,
      message: this.options.message,
    });
  }

  count() {
    const log = this.logs.slice(-1)[0];

    if (log) {
      log.counter += 1;
      this.report(log);
    }
  }

  close(node: VariableDeclarator | FunctionDeclaration) {
    this.logs = this.logs.filter((v) => v.parentNode !== node);
  }

  start(node: VariableDeclarator | FunctionDeclaration) {
    this.logs.push({
      counter: 0,
      error: false,
      parentNode: node,
    });
  }
}
