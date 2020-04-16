export = WixEventually;

type UnPromisify<T> = T extends Promise<infer U> ? U : T;

declare function WixEventually<ReturnValue extends any>(fn: (...args: any) => ReturnValue, opts?: WixEventually.Opts): Promise<UnPromisify<ReturnValue>>;

declare namespace WixEventually {
  export interface Opts {
    timeout?: number;
    interval?: number;
  }

  function _with(overrides: Opts): <ReturnValue extends any>(fn: (...args: any) => ReturnValue, opts?: WixEventually.Opts) => Promise<UnPromisify<ReturnValue>>;
  export { _with as with }
}
