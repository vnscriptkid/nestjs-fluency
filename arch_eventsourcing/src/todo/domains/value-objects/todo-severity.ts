export class TodoSeverity {
  constructor(readonly value: 'low' | 'medium' | 'high') {
    this.value = value;
  }

  equals(severity: TodoSeverity): boolean {
    return this.value === severity.value;
  }

  toJSON(): string {
    return this.value;
  }
}
