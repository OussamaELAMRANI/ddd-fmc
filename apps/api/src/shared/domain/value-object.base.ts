export abstract class ValueObject<T> {
  protected readonly value: T;

  constructor(value: T) {
    this.validate(value);
    this.value = value;
  }

  protected abstract validate(value: T): void;

  public getValue(): T {
    return this.value;
  }

  public equals(other: ValueObject<T>): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.value === this.value
    );
  }
}
