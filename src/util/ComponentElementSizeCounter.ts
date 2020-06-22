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
  private errorNode: Node | null = null;
  private currentNode: Node | null = null;

  private options: Options;

  constructor(options: Options) {
    this.options = options;
  }

  private isSizeOver(): boolean {
    const { max, min = 0 } = this.options;

    this.counter += 1;

    if (this.counter > max || this.counter < min) {
      return true;
    }

    return false;
  }

  init(node: Node) {
    this.counter = 0;
    this.errorNode = null;
    this.currentNode = node;
  }

  check() {
    if (this.errorNode === this.currentNode) return;

    if (this.currentNode && this.isSizeOver()) {
      this.errorNode = this.currentNode;

      this.options.context.report({
        node: this.currentNode as ESNode,
        message: this.options.message,
      });
    }
  }
}
