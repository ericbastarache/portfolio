import { HistoryItem } from "../hooks/useTerminal";

class TerminalHistory {
  public stack: Array<HistoryItem>;
  public current: number;

  constructor() {
    this.stack = [];
    this.current = 0;
  }

  public getHistory() {
    return this.stack;
  }

  public add(item: HistoryItem): void {
    this.stack.push(item);
    this.current = this.stack.length;
  }

  public next(): HistoryItem | null {
    if (this.current <= this.stack.length - 1) {
      this.current += 1;
      return this.stack[this.current];
    }

    return null;
  }

  public previous() : HistoryItem | null {
    if (this.current >= 0) {
      this.current -= 1;
      return this.stack[this.current];
    }
    return null;
  }

}

export default TerminalHistory;
