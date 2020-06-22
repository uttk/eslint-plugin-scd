import { Rule } from "eslint";
import { Node } from "estree-jsx";
import { Node as ESNode } from "estree";

interface Options {
  min?: number;
  max: number;
  message: string;
  context: Rule.RuleContext;
}

export class ComponentElementSizeCounter {
  private counter: number = 0;
  private error: boolean = false;
  private currentNode: Node | null = null;

  private options: Options;

  constructor(options: Options) {
    this.options = options;
  }

  init(node: Node) {
    this.counter = 0;
    this.currentNode = node;
  }

  isSizeOver(): boolean {
    const { max, min = 0 } = this.options;

    this.counter += 1;

    if (this.counter > max || this.counter < min) {
      return true;
    }

    return false;
  }

  check() {
    if (this.error) return;

    if (this.currentNode && this.isSizeOver()) {
      this.error = true;

      this.options.context.report({
        node: this.currentNode as ESNode,
        message: this.options.message,
      });
    }
  }
}
