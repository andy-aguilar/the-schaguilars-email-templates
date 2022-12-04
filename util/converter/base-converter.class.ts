export abstract class BaseConverter<T, U> {
  public abstract doForward(t: T): U | null;
  public abstract doBackward(u: U): T | null;

  public convertAll = (ts: T[]): (U | null)[] => {
    return ts.map(this.doForward);
  };

  public reverseAll = (us: U[]): (T | null)[] => {
    return us.map(this.doBackward);
  };
}
