export class OrderStatus {
  constructor(readonly value: 'pending' | 'completed' | 'cancelled') {}

  equals(other: OrderStatus): boolean {
    return this.value === other.value;
  }
}
