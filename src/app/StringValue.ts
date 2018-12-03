export class StringValue {
  get value(): string {
    return this._value;
  }
  private readonly _value: string;
  constructor(value: string) {
    this._value = value;
  }
}
