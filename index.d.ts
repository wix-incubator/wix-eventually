export = WixEventually;

declare function WixEventually(fn: Function, opts?: WixEventually.Opts): Promise<void>;

declare namespace WixEventually {
  export interface Opts {
    timeout?: number;
    interval?: number;
  }

  function _with(overrides: Opts): (fn: Function, opts?: WixEventually.Opts) => Promise<void>;
  export { _with as with }
}
